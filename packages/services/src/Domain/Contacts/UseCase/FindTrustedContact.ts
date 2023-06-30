import { Predicate, TrustedContactInterface } from '@standardnotes/models'
import { ItemManagerInterface } from './../../Item/ItemManagerInterface'
import { ContentType } from '@standardnotes/common'
import { FindContactQuery } from './FindContactQuery'

export class FindTrustedContactUseCase {
  constructor(private items: ItemManagerInterface) {}

  execute(query: FindContactQuery): TrustedContactInterface | undefined {
    if ('userUuid' in query && query.userUuid) {
      return this.items.itemsMatchingPredicate<TrustedContactInterface>(
        ContentType.TrustedContact,
        new Predicate<TrustedContactInterface>('contactUuid', '=', query.userUuid),
      )[0]
    }

    if ('signingPublicKey' in query && query.signingPublicKey) {
      const allContacts = this.items.getItems<TrustedContactInterface>(ContentType.TrustedContact)
      return allContacts.find((contact) => contact.isSigningKeyTrusted(query.signingPublicKey))
    }

    if ('publicKey' in query && query.publicKey) {
      const allContacts = this.items.getItems<TrustedContactInterface>(ContentType.TrustedContact)
      return allContacts.find((contact) => contact.isPublicKeyTrusted(query.publicKey))
    }

    throw new Error('Invalid query')
  }
}
