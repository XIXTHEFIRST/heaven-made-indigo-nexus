/**
 * Utility functions for exporting data in various formats.
 */

/**
 * Downloads data as a JSON file.
 * @param data The data to export.
 * @param filename The name of the file (without extension).
 */
export const exportToJSON = <T,>(data: T, filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * Downloads data as a CSV file.
 * @param data An array of objects to export.
 * @param filename The name of the file (without extension).
 */
export const exportToCSV = <T extends Record<string, unknown>>(data: T[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(","),
        ...data.map(row =>
            headers.map(header => {
                const value = row[header];
                // Escape commas and wrap in quotes if necessary
                const stringValue = String(value ?? "");
                if (stringValue.includes(",") || stringValue.includes("\"") || stringValue.includes("\n")) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            }).join(",")
        )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
