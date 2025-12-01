import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ScoreCardProps {
    title: string;
    score: number;
    description?: string;
    color?: "blue" | "green" | "red" | "purple" | "yellow";
}

export default function ScoreCard({ title, score, description, color = "blue" }: ScoreCardProps) {
    const colors = {
        blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
        green: "text-green-500 bg-green-500/10 border-green-500/20",
        red: "text-red-500 bg-red-500/10 border-red-500/20",
        purple: "text-purple-500 bg-purple-500/10 border-purple-500/20",
        yellow: "text-yellow-500 bg-yellow-500/10 border-yellow-500/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "p-6 rounded-xl border backdrop-blur-sm",
                colors[color]
            )}
        >
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-200">{title}</h3>
                <span className={cn("text-2xl font-bold", colors[color].split(" ")[0])}>
                    {score}
                </span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-2 mb-2">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn("h-full rounded-full", colors[color].replace("text-", "bg-").split(" ")[0])}
                />
            </div>
            {description && <p className="text-sm text-gray-400">{description}</p>}
        </motion.div>
    );
}
