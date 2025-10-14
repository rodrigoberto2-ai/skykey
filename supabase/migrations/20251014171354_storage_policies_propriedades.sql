-- Storage policies for bucket `propriedades`

-- Allow public read for objects under the 'propriedades' bucket
drop policy if exists storage_propriedades_public_read on storage.objects;
create policy storage_propriedades_public_read
on storage.objects
for select
using (bucket_id = 'propriedades');

-- Allow authenticated users to upload to a path prefixed by their user id
drop policy if exists storage_propriedades_user_insert on storage.objects;
create policy storage_propriedades_user_insert
on storage.objects
for insert to authenticated
with check (
  bucket_id = 'propriedades'
  and coalesce((storage.foldername(name))[1], '') = auth.uid()::text
);

-- Allow authenticated users to update objects they own (same prefix rule)
drop policy if exists storage_propriedades_user_update on storage.objects;
create policy storage_propriedades_user_update
on storage.objects
for update to authenticated
using (
  bucket_id = 'propriedades'
  and coalesce((storage.foldername(name))[1], '') = auth.uid()::text
)
with check (
  bucket_id = 'propriedades'
  and coalesce((storage.foldername(name))[1], '') = auth.uid()::text
);

-- Allow authenticated users to delete objects they own
drop policy if exists storage_propriedades_user_delete on storage.objects;
create policy storage_propriedades_user_delete
on storage.objects
for delete to authenticated
using (
  bucket_id = 'propriedades'
  and coalesce((storage.foldername(name))[1], '') = auth.uid()::text
);

