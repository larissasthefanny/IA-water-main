
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WaterDropIcon from "./WaterDropIcon";

interface WaterIntakeTrackerProps {
  dailyGoal?: number; // in ml
}

const WaterIntakeTracker: React.FC<WaterIntakeTrackerProps> = ({ 
  dailyGoal = 2000 
}) => {
  const [currentIntake, setCurrentIntake] = useState(0);
  const [lastDrink, setLastDrink] = useState<string | null>(null);

  const addWater = (amount: number) => {
    const newAmount = Math.min(currentIntake + amount, dailyGoal);
    setCurrentIntake(newAmount);
    setLastDrink(new Date().toLocaleTimeString());
  };

  const resetIntake = () => {
    setCurrentIntake(0);
    setLastDrink(null);
  };

  const percentComplete = Math.floor((currentIntake / dailyGoal) * 100);

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-blue-100 space-y-4">
      <h3 className="text-lg font-semibold text-center text-blue-800">
        Controle de Hidratação
      </h3>
      
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-blue-700 font-medium">{currentIntake} ml</span>
        <span className="text-sm text-blue-700 font-medium">{dailyGoal} ml</span>
      </div>
      
      <Progress value={percentComplete} className="h-2 bg-blue-100" />
      
      <div className="text-center text-sm text-blue-600 mt-1">
        {percentComplete}% do objetivo diário
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        <Button 
          onClick={() => addWater(200)} 
          variant="outline"
          className="flex flex-col items-center justify-center h-16 border-blue-200 hover:bg-blue-50"
        >
          <WaterDropIcon size={20} className="mb-1" />
          <span className="text-xs">200ml</span>
        </Button>
        
        <Button 
          onClick={() => addWater(300)} 
          variant="outline"
          className="flex flex-col items-center justify-center h-16 border-blue-200 hover:bg-blue-50"
        >
          <WaterDropIcon size={24} className="mb-1" />
          <span className="text-xs">300ml</span>
        </Button>
        
        <Button 
          onClick={() => addWater(500)} 
          variant="outline"
          className="flex flex-col items-center justify-center h-16 border-blue-200 hover:bg-blue-50"
        >
          <WaterDropIcon size={28} className="mb-1" />
          <span className="text-xs">500ml</span>
        </Button>
      </div>
      
      {lastDrink && (
        <div className="text-center text-xs text-blue-500 mt-2">
          Último registro: {lastDrink}
        </div>
      )}
      
      <Button 
        onClick={resetIntake} 
        variant="ghost" 
        className="w-full mt-2 text-xs text-blue-500 hover:text-blue-700"
      >
        Zerar Contador
      </Button>
    </div>
  );
};

export default WaterIntakeTracker;
