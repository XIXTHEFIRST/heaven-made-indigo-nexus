import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploaderProps {
    bucket: 'event-assets' | 'sponsor-logos';
    path: string;
    onUploadComplete: (url: string) => void;
    allowedTypes?: string[];
    label?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    bucket,
    path,
    onUploadComplete,
    allowedTypes = ['image/*', 'application/pdf'],
    label = "Upload File"
}) => {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = e.target.files?.[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `${path}/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            onUploadComplete(publicUrl);
            toast.success('Upload successful');
        } catch (error: any) {
            toast.error(error.message || 'Error uploading file');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleUpload}
                accept={allowedTypes.join(',')}
                className="hidden"
            />
            <Button
                type="button"
                variant="outline"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300"
            >
                {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                    <Upload className="h-4 w-4 mr-2" />
                )}
                {label}
            </Button>
        </div>
    );
};

export default FileUploader;
