import { motion } from "framer-motion";
import { User, DollarSign, AlertTriangle, Lightbulb } from "lucide-react";

interface SharkCardProps {
    name: string;
    feedback: string;
    decision: "Invest" | "Not Invest" | "Need More Info";
    delay?: number;
}

export default function SharkCard({ name, feedback, decision, delay = 0 }: SharkCardProps) {
    const getIcon = () => {
        if (name.includes("Visionary")) return <Lightbulb className="w-6 h-6 text-yellow-400" />;
        if (name.includes("Finance")) return <DollarSign className="w-6 h-6 text-green-400" />;
        if (name.includes("Skeptic")) return <AlertTriangle className="w-6 h-6 text-red-400" />;
        return <User className="w-6 h-6 text-blue-400" />;
    };

    const getDecisionColor = () => {
        switch (decision) {
            case "Invest": return "text-green-400 border-green-500/30 bg-green-500/10";
            case "Not Invest": return "text-red-400 border-red-500/30 bg-red-500/10";
            default: return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="p-6 rounded-xl border border-gray-800 bg-gray-900/80 backdrop-blur-md hover:border-gray-700 transition-colors"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-gray-800 rounded-full">
                    {getIcon()}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-white">{name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getDecisionColor()}`}>
                        {decision}
                    </span>
                </div>
            </div>
            <p className="text-gray-300 italic">"{feedback}"</p>
        </motion.div>
    );
}
