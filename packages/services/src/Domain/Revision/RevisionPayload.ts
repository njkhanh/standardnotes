export type RevisionPayload = {
  uuid: string
  item_uuid: string
  content: string | null
  content_type: string
  items_key_id: string | null
  enc_item_key: string | null
  auth_hash: string | null
  created_at: string
  updated_at: string
  user_uuid: string
  key_system_identifier: string | null
  shared_vault_uuid: string | null
}
