-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-assets', 'event-assets', true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('sponsor-logos', 'sponsor-logos', true);

-- RLS for event-assets
CREATE POLICY "Public Access to Event Assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'event-assets');

CREATE POLICY "Authenticated users can upload event assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-assets');

CREATE POLICY "Users can update/delete their own event assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (auth.uid() = owner);

CREATE POLICY "Users can update/delete their own event assets"
ON storage.objects FOR DELETE
TO authenticated
USING (auth.uid() = owner);

-- RLS for sponsor-logos
CREATE POLICY "Public Access to Sponsor Logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'sponsor-logos');

CREATE POLICY "Authenticated users can upload sponsor logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'sponsor-logos');
