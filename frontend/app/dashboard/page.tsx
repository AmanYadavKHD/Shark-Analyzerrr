"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScoreCard from "@/components/ScoreCard";
import SharkCard from "@/components/SharkCard";
import { ArrowLeft, BarChart3, Mic, Brain } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedData = localStorage.getItem("analysisResults");
        if (!storedData) {
            router.push("/");
            return;
        }
        setData(JSON.parse(storedData));
    }, [router]);

    if (!data) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    const { audio_analysis, content_analysis, shark_feedback } = data;

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Pitch Analysis Report</h1>
                </div>

                {/* Top Level Scores */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ScoreCard
                        title="Vocal Confidence"
                        score={audio_analysis.clarity_score}
                        description="Based on pitch stability and volume control."
                        color="blue"
                    />
                    <ScoreCard
                        title="Business Viability"
                        score={content_analysis.overall_business_score || 0}
                        description="Based on problem, solution, and market logic."
                        color="green"
                    />
                    <ScoreCard
                        title="Energy Level"
                        score={audio_analysis.energy_score}
                        description="Based on dynamic range and tempo."
                        color="yellow"
                    />
                </div>

                {/* Deep Dive Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Audio Metrics */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Mic className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-semibold">Delivery Metrics</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div className="text-sm text-gray-400">Avg Pitch</div>
                                <div className="text-xl font-mono">{audio_analysis.metrics.avg_pitch.toFixed(0)} Hz</div>
                            </div>
                            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div className="text-sm text-gray-400">Pace</div>
                                <div className="text-xl font-mono">{audio_analysis.metrics.avg_tempo.toFixed(0)} BPM</div>
                            </div>
                            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div className="text-sm text-gray-400">Pauses</div>
                                <div className="text-xl font-mono">{(audio_analysis.metrics.pause_ratio * 100).toFixed(1)}%</div>
                            </div>
                            <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <div className="text-sm text-gray-400">Emotion</div>
                                <div className="text-xl font-mono text-blue-400">
                                    {Object.keys(audio_analysis.emotions)[0] || "Neutral"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Metrics */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Brain className="w-6 h-6 text-purple-500" />
                            <h2 className="text-2xl font-semibold">Content Analysis</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <span>Problem Clarity</span>
                                <span className="font-bold text-green-400">{content_analysis.problem_clarity}/100</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <span>Product Differentiation</span>
                                <span className="font-bold text-blue-400">{content_analysis.product_differentiation}/100</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <span>Business Model</span>
                                <span className="font-bold text-purple-400">{content_analysis.business_model}/100</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-900 rounded-lg border border-gray-800">
                                <span>Market Opportunity</span>
                                <span className="font-bold text-yellow-400">{content_analysis.market_opportunity}/100</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Shark Tank Panel */}
                <div className="space-y-8 pt-8 border-t border-gray-800">
                    <h2 className="text-3xl font-bold text-center">The Shark Panel Verdict</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {shark_feedback.map((shark: any, index: number) => (
                            <SharkCard
                                key={index}
                                name={shark.shark}
                                feedback={shark.feedback}
                                decision={shark.decision}
                                delay={index * 0.2}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
