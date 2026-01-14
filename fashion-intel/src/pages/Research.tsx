import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useResearchStore } from '@/stores/researchStore';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Download, Upload } from 'lucide-react';
import { format } from 'date-fns';
import { useRef } from 'react';

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    type: z.string().min(1, {
        message: "Please select a type.",
    }),
    content: z.string().min(10, {
        message: "Content must be at least 10 characters.",
    }),
    source: z.string().optional(),
});

const Research = () => {
    const { entries, addEntry, removeEntry } = useResearchStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            type: "",
            content: "",
            source: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        addEntry({
            title: values.title,
            type: values.type,
            content: values.content,
            source: values.source || "",
        });
        form.reset();
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(entries, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `research-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                const importedEntries = JSON.parse(content);
                // Validate if needed, or just loop add
                if (Array.isArray(importedEntries)) {
                    importedEntries.forEach(entry => {
                        // remove ID/created at to ensure fresh import, or keep unique check?
                        // Simplest is to just use store's addEntry which generates new IDs
                        addEntry({
                            title: entry.title,
                            type: entry.type,
                            content: entry.content || entry.notes, // handle potential fallback
                            source: entry.source
                        });
                    });
                }
            } catch (error) {
                console.error("Failed to import", error);
                // toast.error("Failed to import data");
            }
        };
        reader.readAsText(file);
        // Reset input
        event.target.value = '';
    };

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Form Section */}
                <div className="w-full md:w-1/3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Research Entry</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Trend Analysis Q3" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Trend">Trend</SelectItem>
                                                        <SelectItem value="Fabric">Fabric</SelectItem>
                                                        <SelectItem value="Competitor">Competitor</SelectItem>
                                                        <SelectItem value="Event">Event</SelectItem>
                                                        <SelectItem value="Inspiration">Inspiration</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="content"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Content/Notes</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Detailed notes about the research..."
                                                        className="min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="source"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Source (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full">Save Entry</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* List Section */}
                <div className="w-full md:w-2/3">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-serif">Research Data Logs</h2>
                            <div className="flex gap-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImport}
                                    className="hidden"
                                    accept=".json"
                                />
                                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Import
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleExport}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>
                        {entries.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
                                No research data found. Start by adding a new entry.
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {entries.map((entry) => (
                                    <Card key={entry.id} className="relative group overflow-hidden">
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary mb-2">
                                                        {entry.type}
                                                    </span>
                                                    <CardTitle className="text-xl">{entry.title}</CardTitle>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-muted-foreground hover:text-destructive transition-colors"
                                                    onClick={() => removeEntry(entry.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="whitespace-pre-wrap text-sm text-foreground/80 mb-4">
                                                {entry.content}
                                            </p>
                                            <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t">
                                                <span className="truncate max-w-[200px]">
                                                    {entry.source && (
                                                        <a
                                                            href={entry.source}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="hover:underline text-primary"
                                                        >
                                                            Source Link
                                                        </a>
                                                    )}
                                                </span>
                                                <span>
                                                    {format(new Date(entry.createdAt), 'PPP')}
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Research;
