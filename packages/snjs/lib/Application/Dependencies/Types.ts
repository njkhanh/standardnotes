export const TYPES = {
  // System
  DeviceInterface: Symbol.for('DeviceInterface'),
  AlertService: Symbol.for('AlertService'),
  Crypto: Symbol.for('Crypto'),

  // Services
  InternalEventBus: Symbol.for('InternalEventBus'),
  PayloadManager: Symbol.for('PayloadManager'),
  ItemManager: Symbol.for('ItemManager'),
  MutatorService: Symbol.for('MutatorService'),
  DiskStorageService: Symbol.for('DiskStorageService'),
  NotificationService: Symbol.for('NotificationService'),
  InMemoryStore: Symbol.for('InMemoryStore'),
  KeySystemKeyManager: Symbol.for('KeySystemKeyManager'),
  EncryptionService: Symbol.for('EncryptionService'),
  ChallengeService: Symbol.for('ChallengeService'),
  DeprecatedHttpService: Symbol.for('DeprecatedHttpService'),
  HttpService: Symbol.for('HttpService'),
  LegacyApiService: Symbol.for('LegacyApiService'),
  UserServer: Symbol.for('UserServer'),
  UserRequestServer: Symbol.for('UserRequestServer'),
  UserApiService: Symbol.for('UserApiService'),
  SubscriptionServer: Symbol.for('SubscriptionServer'),
  SubscriptionApiService: Symbol.for('SubscriptionApiService'),
  WebSocketServer: Symbol.for('WebSocketServer'),
  WebSocketApiService: Symbol.for('WebSocketApiService'),
  WebSocketsService: Symbol.for('WebSocketsService'),
  SessionManager: Symbol.for('SessionManager'),
  SubscriptionManager: Symbol.for('SubscriptionManager'),
  HistoryManager: Symbol.for('HistoryManager'),
  SyncFrequencyGuard: Symbol.for('SyncFrequencyGuard'),
  SyncService: Symbol.for('SyncService'),
  ProtectionService: Symbol.for('ProtectionService'),
  UserService: Symbol.for('UserService'),
  KeyRecoveryService: Symbol.for('KeyRecoveryService'),
  SingletonManager: Symbol.for('SingletonManager'),
  PreferencesService: Symbol.for('PreferencesService'),
  SettingsService: Symbol.for('SettingsService'),
  FeaturesService: Symbol.for('FeaturesService'),
  ComponentManager: Symbol.for('ComponentManager'),
  MfaService: Symbol.for('MfaService'),
  StatusService: Symbol.for('StatusService'),
  MigrationService: Symbol.for('MigrationService'),
  FileService: Symbol.for('FileService'),
  IntegrityService: Symbol.for('IntegrityService'),
  ListedService: Symbol.for('ListedService'),
  ActionsService: Symbol.for('ActionsService'),
  AuthenticatorApiService: Symbol.for('AuthenticatorApiService'),
  AuthenticatorManager: Symbol.for('AuthenticatorManager'),
  AuthApiService: Symbol.for('AuthApiService'),
  AuthManager: Symbol.for('AuthManager'),
  RevisionApiService: Symbol.for('RevisionApiService'),
  RevisionManager: Symbol.for('RevisionManager'),
  ContactService: Symbol.for('ContactService'),
  VaultService: Symbol.for('VaultService'),
  SharedVaultService: Symbol.for('SharedVaultService'),
  AsymmetricMessageService: Symbol.for('AsymmetricMessageService'),
  SelfContactManager: Symbol.for('SelfContactManager'),
  EncryptionOperators: Symbol.for('EncryptionOperators'),
  RootKeyManager: Symbol.for('RootKeyManager'),
  ItemsEncryptionService: Symbol.for('ItemsEncryptionService'),
  VaultUserService: Symbol.for('VaultUserService'),
  VaultInviteService: Symbol.for('VaultInviteService'),
  VaultUserCache: Symbol.for('VaultUserCache'),
  VaultLockService: Symbol.for('VaultLockService'),
  Logger: Symbol.for('Logger'),

  // Servers
  RevisionServer: Symbol.for('RevisionServer'),
  AuthenticatorServer: Symbol.for('AuthenticatorServer'),
  AuthServer: Symbol.for('AuthServer'),
  SharedVaultInvitesServer: Symbol.for('SharedVaultInvitesServer'),
  SharedVaultServer: Symbol.for('SharedVaultServer'),
  SharedVaultUsersServer: Symbol.for('SharedVaultUsersServer'),
  AsymmetricMessageServer: Symbol.for('AsymmetricMessageServer'),

  // Desktop Services
  FilesBackupService: Symbol.for('FilesBackupService'),
  HomeServerService: Symbol.for('HomeServerService'),

  // Usecases
  SignInWithRecoveryCodes: Symbol.for('SignInWithRecoveryCodes'),
  GetRecoveryCodes: Symbol.for('GetRecoveryCodes'),
  AddAuthenticator: Symbol.for('AddAuthenticator'),
  ListAuthenticators: Symbol.for('ListAuthenticators'),
  DeleteAuthenticator: Symbol.for('DeleteAuthenticator'),
  GetAuthenticatorAuthenticationOptions: Symbol.for('GetAuthenticatorAuthenticationOptions'),
  GetAuthenticatorAuthenticationResponse: Symbol.for('GetAuthenticatorAuthenticationResponse'),
  ListRevisions: Symbol.for('ListRevisions'),
  GetRevision: Symbol.for('GetRevision'),
  DeleteRevision: Symbol.for('DeleteRevision'),
  ImportData: Symbol.for('ImportData'),
  DiscardItemsLocally: Symbol.for('DiscardItemsLocally'),
  FindContact: Symbol.for('FindContact'),
  GetAllContacts: Symbol.for('GetAllContacts'),
  CreateOrEditContact: Symbol.for('CreateOrEditContact'),
  EditContact: Symbol.for('EditContact'),
  ValidateItemSigner: Symbol.for('ValidateItemSigner'),
  GetVault: Symbol.for('GetVault'),
  GetVaults: Symbol.for('GetVaults'),
  SyncLocalVaultsWithRemoteSharedVaults: Symbol.for('SyncLocalVaultsWithRemoteSharedVaults'),
  GetSharedVaults: Symbol.for('GetSharedVaults'),
  GetOwnedSharedVaults: Symbol.for('GetOwnedSharedVaults'),
  ChangeVaultKeyOptions: Symbol.for('ChangeVaultKeyOptions'),
  MoveItemsToVault: Symbol.for('MoveItemsToVault'),
  CreateVault: Symbol.for('CreateVault'),
  DeleteContact: Symbol.for('DeleteContact'),
  ContactBelongsToVault: Symbol.for('ContactBelongsToVault'),
  RemoveItemFromVault: Symbol.for('RemoveItemFromVault'),
  DeleteVault: Symbol.for('DeleteVault'),
  RotateVaultKey: Symbol.for('RotateVaultKey'),
  CreateSharedVault: Symbol.for('CreateSharedVault'),
  HandleKeyPairChange: Symbol.for('HandleKeyPairChange'),
  NotifyVaultUsersOfKeyRotation: Symbol.for('NotifyVaultUsersOfKeyRotation'),
  SendVaultDataChangedMessage: Symbol.for('SendVaultDataChangedMessage'),
  SendVaultKeyChangedMessage: Symbol.for('SendVaultKeyChangedMessage'),
  GetTrustedPayload: Symbol.for('GetTrustedPayload'),
  GetUntrustedPayload: Symbol.for('GetUntrustedPayload'),
  GetVaultContacts: Symbol.for('GetVaultContacts'),
  AcceptVaultInvite: Symbol.for('AcceptVaultInvite'),
  InviteToVault: Symbol.for('InviteToVault'),
  LeaveVault: Symbol.for('LeaveVault'),
  DeleteThirdPartyVault: Symbol.for('DeleteThirdPartyVault'),
  ShareContactWithVault: Symbol.for('ShareContactWithVault'),
  ConvertToSharedVault: Symbol.for('ConvertToSharedVault'),
  DeleteSharedVault: Symbol.for('DeleteSharedVault'),
  RemoveVaultMember: Symbol.for('RemoveVaultMember'),
  DesignateSurvivor: Symbol.for('DesignateSurvivor'),
  GetVaultUsers: Symbol.for('GetSharedVaultUsers'),
  ResendAllMessages: Symbol.for('ResendAllMessages'),
  ReuploadAllInvites: Symbol.for('ReuploadAllInvites'),
  ReuploadInvite: Symbol.for('ReuploadInvite'),
  GetInboundMessages: Symbol.for('GetInboundMessages'),
  GetOutboundMessages: Symbol.for('GetOutboundMessages'),
  HandleRootKeyChangedMessage: Symbol.for('HandleRootKeyChangedMessage'),
  ProcessAcceptedVaultInvite: Symbol.for('ProcessAcceptedVaultInvite'),
  ResendMessage: Symbol.for('ResendMessage'),
  SendMessage: Symbol.for('SendMessage'),
  SendOwnContactChangeMessage: Symbol.for('SendOwnContactChangeMessage'),
  DecryptMessage: Symbol.for('DecryptMessage'),
  DecryptOwnMessage: Symbol.for('DecryptOwnMessage'),
  EncryptMessage: Symbol.for('EncryptMessage'),
  GetMessageAdditionalData: Symbol.for('GetMessageAdditionalData'),
  SendVaultInvite: Symbol.for('SendVaultInvite'),
  ReplaceContactData: Symbol.for('ReplaceContactData'),
  CreateNewDefaultItemsKey: Symbol.for('CreateNewDefaultItemsKey'),
  CreateNewItemsKeyWithRollback: Symbol.for('CreateNewItemsKeyWithRollback'),
  FindDefaultItemsKey: Symbol.for('FindDefaultItemsKey'),
  DecryptErroredTypeAPayloads: Symbol.for('DecryptErroredTypeAPayloads'),
  DecryptTypeAPayload: Symbol.for('DecryptTypeAPayload'),
  DecryptTypeAPayloadWithKeyLookup: Symbol.for('DecryptTypeAPayloadWithKeyLookup'),
  EncryptTypeAPayload: Symbol.for('EncryptTypeAPayload'),
  EncryptTypeAPayloadWithKeyLookup: Symbol.for('EncryptTypeAPayloadWithKeyLookup'),
  DecryptBackupFile: Symbol.for('DecryptBackupFile'),
  IsVaultOwner: Symbol.for('IsVaultOwner'),
  IsVaultAdmin: Symbol.for('IsVaultAdmin'),
  IsReadonlyVaultMember: Symbol.for('IsReadonlyVaultMember'),
  RemoveItemsFromMemory: Symbol.for('RemoveItemsFromMemory'),
  ReencryptTypeAItems: Symbol.for('ReencryptTypeAItems'),
  DecryptErroredPayloads: Symbol.for('DecryptErroredPayloads'),
  GetKeyPairs: Symbol.for('GetKeyPairs'),
  ChangeVaultStorageMode: Symbol.for('ChangeVaultStorageMode'),
  ChangeAndSaveItem: Symbol.for('ChangeAndSaveItem'),
  GetHost: Symbol.for('GetHost'),
  IsApplicationUsingThirdPartyHost: Symbol.for('IsApplicationUsingThirdPartyHost'),
  SetHost: Symbol.for('SetHost'),
  GenerateUuid: Symbol.for('GenerateUuid'),
  GetVaultItems: Symbol.for('GetVaultItems'),
  ValidateVaultPassword: Symbol.for('ValidateVaultPassword'),
  DecryptBackupPayloads: Symbol.for('DecryptBackupPayloads'),
  DetermineKeyToUse: Symbol.for('DetermineKeyToUse'),
  GetBackupFileType: Symbol.for('GetBackupFileType'),
  GetFilePassword: Symbol.for('GetFilePassword'),
  AuthorizeVaultDeletion: Symbol.for('AuthorizeVaultDeletion'),
  CreateDecryptedBackupFile: Symbol.for('CreateDecryptedBackupFile'),
  CreateEncryptedBackupFile: Symbol.for('CreateEncryptedBackupFile'),

  // Mappers
  SessionStorageMapper: Symbol.for('SessionStorageMapper'),
  LegacySessionStorageMapper: Symbol.for('LegacySessionStorageMapper'),
}
