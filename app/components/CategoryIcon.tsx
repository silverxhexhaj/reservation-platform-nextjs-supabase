import { Scissors, Heart, Sun, Eye, Dumbbell, Syringe } from 'lucide-react';
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
};

export function CategoryIcon({ icon, className = "" }: CategoryIconProps) {
  const Icon = iconMap[icon];
  return <Icon className={className} />;
} 