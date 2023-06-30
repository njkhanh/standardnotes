import { ContentType } from '@standardnotes/common'
import {
  ItemsKeyInterface,
  DecryptedItemInterface,
  PayloadEmitSource,
  EncryptedItemInterface,
  DeletedItemInterface,
  ItemContent,
  PredicateInterface,
  DecryptedPayload,
  SNTag,
  ItemInterface,
  AnyItemInterface,
  KeySystemIdentifier,
  ItemCollection,
  SNNote,
  SmartView,
  TagItemCountChangeObserver,
  SNComponent,
  SNTheme,
  DecryptedPayloadInterface,
  DecryptedTransferPayload,
  FileItem,
  VaultDisplayOptions,
  NotesAndFilesDisplayControllerOptions,
} from '@standardnotes/models'
import { AbstractService } from '../Service/AbstractService'

export type ItemManagerChangeData<I extends DecryptedItemInterface = DecryptedItemInterface> = {
  /** The items are pre-existing but have been changed */
  changed: I[]

  /** The items have been newly inserted */
  inserted: I[]

  /** The items should no longer be displayed in the interface, either due to being deleted, or becoming error-encrypted */
  removed: (EncryptedItemInterface | DeletedItemInterface)[]

  /** Items for which encrypted overwrite protection is enabled and enacted */
  ignored: EncryptedItemInterface[]

  /** Items which were previously error decrypting but now successfully decrypted */
  unerrored: I[]

  source: PayloadEmitSource
  sourceKey?: string
}

export type ItemManagerChangeObserverCallback<I extends DecryptedItemInterface = DecryptedItemInterface> = (
  data: ItemManagerChangeData<I>,
) => void

export interface ItemManagerInterface extends AbstractService {
  getCollection(): ItemCollection

  addObserver<I extends DecryptedItemInterface = DecryptedItemInterface>(
    contentType: ContentType | ContentType[],
    callback: ItemManagerChangeObserverCallback<I>,
  ): () => void

  get items(): DecryptedItemInterface[]

  getItems<T extends DecryptedItemInterface>(contentType: ContentType | ContentType[]): T[]
  get invalidItems(): EncryptedItemInterface[]
  allTrackedItems(): ItemInterface[]
  getDisplayableItemsKeys(): ItemsKeyInterface[]

  createTemplateItem<
    C extends ItemContent = ItemContent,
    I extends DecryptedItemInterface<C> = DecryptedItemInterface<C>,
  >(
    contentType: ContentType,
    content?: C,
    override?: Partial<DecryptedPayload<C>>,
  ): I

  itemsMatchingPredicate<T extends DecryptedItemInterface>(
    contentType: ContentType,
    predicate: PredicateInterface<T>,
  ): T[]
  itemsMatchingPredicates<T extends DecryptedItemInterface>(
    contentType: ContentType,
    predicates: PredicateInterface<T>[],
  ): T[]
  subItemsMatchingPredicates<T extends DecryptedItemInterface>(items: T[], predicates: PredicateInterface<T>[]): T[]
  removeAllItemsFromMemory(): Promise<void>
  removeItemsLocally(items: AnyItemInterface[]): void
  getDirtyItems(): (DecryptedItemInterface | DeletedItemInterface)[]
  getTagLongTitle(tag: SNTag): string
  getSortedTagsForItem(item: DecryptedItemInterface<ItemContent>): SNTag[]
  itemsReferencingItem<I extends DecryptedItemInterface = DecryptedItemInterface>(
    itemToLookupUuidFor: { uuid: string },
    contentType?: ContentType,
  ): I[]
  referencesForItem<I extends DecryptedItemInterface = DecryptedItemInterface>(
    itemToLookupUuidFor: DecryptedItemInterface,
    contentType?: ContentType,
  ): I[]
  findItem<T extends DecryptedItemInterface = DecryptedItemInterface>(uuid: string): T | undefined
  findItems<T extends DecryptedItemInterface>(uuids: string[]): T[]
  findSureItem<T extends DecryptedItemInterface = DecryptedItemInterface>(uuid: string): T
  get trashedItems(): SNNote[]
  itemsBelongingToKeySystem(systemIdentifier: KeySystemIdentifier): DecryptedItemInterface[]
  hasTagsNeedingFoldersMigration(): boolean
  get invalidNonVaultedItems(): EncryptedItemInterface[]
  isTemplateItem(item: DecryptedItemInterface): boolean
  getSmartViews(): SmartView[]
  addNoteCountChangeObserver(observer: TagItemCountChangeObserver): () => void
  allCountableNotesCount(): number
  allCountableFilesCount(): number
  countableNotesForTag(tag: SNTag | SmartView): number
  getNoteCount(): number
  getDisplayableTags(): SNTag[]
  getTagChildren(itemToLookupUuidFor: SNTag): SNTag[]
  getTagParent(itemToLookupUuidFor: SNTag): SNTag | undefined
  isValidTagParent(parentTagToLookUpUuidFor: SNTag, childToLookUpUuidFor: SNTag): boolean
  isSmartViewTitle(title: string): boolean
  getDisplayableComponents(): (SNComponent | SNTheme)[]
  createItemFromPayload(payload: DecryptedPayloadInterface): DecryptedItemInterface
  createPayloadFromObject(object: DecryptedTransferPayload): DecryptedPayloadInterface
  getDisplayableFiles(): FileItem[]
  setVaultDisplayOptions(options: VaultDisplayOptions): void
  numberOfNotesWithConflicts(): number
  getDisplayableNotes(): SNNote[]
  getDisplayableNotesAndFiles(): (SNNote | FileItem)[]
  setPrimaryItemDisplayOptions(options: NotesAndFilesDisplayControllerOptions): void
  getTagPrefixTitle(tag: SNTag): string | undefined
  getNoteLinkedFiles(note: SNNote): FileItem[]
  conflictsOf(uuid: string): AnyItemInterface[]
}
