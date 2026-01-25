import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-6 bg-background">
                    <Card className="max-w-md w-full glass-premium border-red-500/20">
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>
                            <CardTitle className="text-2xl font-serif">Something went wrong</CardTitle>
                            <CardDescription>
                                The intelligence system encountered an unexpected error.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-xl bg-black/20 border border-white/5">
                                <p className="text-xs font-mono text-muted-foreground break-words leading-relaxed">
                                    {this.state.error?.message}
                                </p>
                            </div>
                            <Button
                                onClick={() => window.location.reload()}
                                className="w-full bg-intelligence-primary hover:bg-intelligence-primary-dark text-white font-bold h-12 rounded-xl"
                            >
                                <RefreshCcw className="w-4 h-4 mr-2" />
                                Reload Intelligence Feed
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
