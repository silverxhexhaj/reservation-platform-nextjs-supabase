import { 
  Scissors, 
  Heart, 
  Sun, 
  Eye, 
  Dumbbell, 
  Syringe, 
  Yoga as YogaIcon, 
  Flower2, 
  Tooth as ToothIcon, 
  Activity, 
  Stethoscope as StethoscopeIcon, 
  Needle as NeedleIcon, 
  Sparkles as SparklesIcon, 
  Gem as GemIcon, 
  Paintbrush as PaintbrushIcon, 
  Zap 
} from 'lucide-react';
import { CategoryIconType } from '@/data';

interface CategoryIconProps {
  icon: CategoryIconType;
  className?: string;
}

const iconMap = {
  scissors: Scissors,
  heart: Heart,
  sun: Sun,
  eye: Eye,
  dumbbell: Dumbbell,
  syringe: Syringe,
  yoga: YogaIcon,
  flower: Flower2,
  tooth: ToothIcon,
  activity: Activity,
  stethoscope: StethoscopeIcon,
  needle: NeedleIcon,
  sparkles: SparklesIcon,
  gem: GemIcon,
  paintbrush: PaintbrushIcon,
  zap: Zap
};

export function CategoryIcon({ icon, className = "" }: CategoryIconProps) {
  const Icon = iconMap[icon];
  if (!Icon) {
    console.warn(`Icon not found for category: ${icon}`);
    return <Heart className={className} />; // Fallback icon
  }
  return <Icon className={className} />;
} 