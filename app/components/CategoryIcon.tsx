import {
  Scissors,
  Heart,
  Sun,
  Eye,
  Dumbbell,
  Syringe,
  Flower2,
  Activity,
  Stethoscope as StethoscopeIcon,
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
  flower: Flower2,
  activity: Activity,
  stethoscope: StethoscopeIcon,
  sparkles: SparklesIcon,
  gem: GemIcon,
  paintbrush: PaintbrushIcon,
  zap: Zap
};

export function CategoryIcon({ icon, className = "" }: CategoryIconProps) {
  const Icon = iconMap[icon];
  if (!Icon) {
    return <Heart className={className} />; // Fallback icon
  }
  return <Icon className={className} />;
} 