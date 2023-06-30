import { MutatorClientInterface, SyncServiceInterface } from '@standardnotes/services'
import { ItemManagerInterface } from '../../Item/ItemManagerInterface'
import {
  KeySystemRootKeyPasswordType,
  KeySystemRootKeyStorageMode,
  VaultListingInterface,
  VaultListingMutator,
} from '@standardnotes/models'
import { EncryptionProviderInterface, KeySystemKeyManagerInterface } from '@standardnotes/encryption'
import { ChangeVaultOptionsDTO } from '../ChangeVaultOptionsDTO'
import { GetVaultUseCase } from './GetVault'
import { assert } from '@standardnotes/utils'

export class ChangeVaultKeyOptionsUseCase {
  constructor(
    private items: ItemManagerInterface,
    private mutator: MutatorClientInterface,
    private sync: SyncServiceInterface,
    private encryption: EncryptionProviderInterface,
  ) {}

  private get keys(): KeySystemKeyManagerInterface {
    return this.encryption.keys
  }

  async execute(dto: ChangeVaultOptionsDTO): Promise<void> {
    const useStorageMode = dto.newKeyStorageMode ?? dto.vault.keyStorageMode

    if (dto.newPasswordType) {
      if (dto.vault.keyPasswordType === dto.newPasswordType.passwordType) {
        throw new Error('Vault password type is already set to this type')
      }

      if (dto.newPasswordType.passwordType === KeySystemRootKeyPasswordType.UserInputted) {
        if (!dto.newPasswordType.userInputtedPassword) {
          throw new Error('User inputted password is required')
        }
        await this.changePasswordTypeToUserInputted(dto.vault, dto.newPasswordType.userInputtedPassword, useStorageMode)
      } else if (dto.newPasswordType.passwordType === KeySystemRootKeyPasswordType.Randomized) {
        await this.changePasswordTypeToRandomized(dto.vault, useStorageMode)
      }
    }

    if (dto.newKeyStorageMode) {
      const usecase = new GetVaultUseCase(this.items)
      const latestVault = usecase.execute({ keySystemIdentifier: dto.vault.systemIdentifier })
      assert(latestVault)

      if (latestVault.rootKeyParams.passwordType !== KeySystemRootKeyPasswordType.UserInputted) {
        throw new Error('Vault uses randomized password and cannot change its storage preference')
      }

      if (dto.newKeyStorageMode === latestVault.keyStorageMode) {
        throw new Error('Vault already uses this storage preference')
      }

      if (
        dto.newKeyStorageMode === KeySystemRootKeyStorageMode.Local ||
        dto.newKeyStorageMode === KeySystemRootKeyStorageMode.Ephemeral
      ) {
        await this.changeStorageModeToLocalOrEphemeral(latestVault, dto.newKeyStorageMode)
      } else if (dto.newKeyStorageMode === KeySystemRootKeyStorageMode.Synced) {
        await this.changeStorageModeToSynced(latestVault)
      }
    }

    await this.sync.sync()
  }

  private async changePasswordTypeToUserInputted(
    vault: VaultListingInterface,
    userInputtedPassword: string,
    storageMode: KeySystemRootKeyStorageMode,
  ): Promise<void> {
    const newRootKey = this.encryption.createUserInputtedKeySystemRootKey({
      systemIdentifier: vault.systemIdentifier,
      userInputtedPassword: userInputtedPassword,
    })

    if (storageMode === KeySystemRootKeyStorageMode.Synced) {
      await this.mutator.insertItem(newRootKey, true)
    } else {
      this.encryption.keys.intakeNonPersistentKeySystemRootKey(newRootKey, storageMode)
    }

    await this.mutator.changeItem<VaultListingMutator>(vault, (mutator) => {
      mutator.rootKeyParams = newRootKey.keyParams
    })

    await this.encryption.reencryptKeySystemItemsKeysForVault(vault.systemIdentifier)
  }

  private async changePasswordTypeToRandomized(
    vault: VaultListingInterface,
    storageMode: KeySystemRootKeyStorageMode,
  ): Promise<void> {
    const newRootKey = this.encryption.createRandomizedKeySystemRootKey({
      systemIdentifier: vault.systemIdentifier,
    })

    if (storageMode !== KeySystemRootKeyStorageMode.Synced) {
      throw new Error('Cannot change to randomized password if root key storage is not synced')
    }

    await this.mutator.changeItem<VaultListingMutator>(vault, (mutator) => {
      mutator.rootKeyParams = newRootKey.keyParams
    })

    await this.mutator.insertItem(newRootKey, true)

    await this.encryption.reencryptKeySystemItemsKeysForVault(vault.systemIdentifier)
  }

  private async changeStorageModeToLocalOrEphemeral(
    vault: VaultListingInterface,
    newKeyStorageMode: KeySystemRootKeyStorageMode,
  ): Promise<void> {
    const primaryKey = this.keys.getPrimaryKeySystemRootKey(vault.systemIdentifier)
    if (!primaryKey) {
      throw new Error('No primary key found')
    }

    this.keys.intakeNonPersistentKeySystemRootKey(primaryKey, newKeyStorageMode)
    await this.keys.deleteAllSyncedKeySystemRootKeys(vault.systemIdentifier)

    await this.mutator.changeItem<VaultListingMutator>(vault, (mutator) => {
      mutator.keyStorageMode = newKeyStorageMode
    })

    await this.sync.sync()
  }

  private async changeStorageModeToSynced(vault: VaultListingInterface): Promise<void> {
    const allRootKeys = this.keys.getAllKeySystemRootKeysForVault(vault.systemIdentifier)
    const syncedRootKeys = this.keys.getSyncedKeySystemRootKeysForVault(vault.systemIdentifier)

    for (const key of allRootKeys) {
      const existingSyncedKey = syncedRootKeys.find((syncedKey) => syncedKey.token === key.token)
      if (existingSyncedKey) {
        continue
      }

      await this.mutator.insertItem(key)
    }

    await this.mutator.changeItem<VaultListingMutator>(vault, (mutator) => {
      mutator.keyStorageMode = KeySystemRootKeyStorageMode.Synced
    })
  }
}
