import {
  Fuel,
  Anchor,
  Ship,
  Truck,
  Cpu,
  Shield,
  Compass,
  Wrench,
  Briefcase,
  TrendingUp,
  Award,
  ShieldCheck,
  Clock,
  Compass as CompassIcon,
  Globe,
  Users
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Fuel,
  Anchor,
  Ship,
  Truck,
  Cpu,
  Shield,
  Compass,
  Wrench,
  Briefcase,
  TrendingUp,
  Award,
  ShieldCheck,
  Clock,
  Globe,
  Users
};

interface ServiceIconProps {
  name: string;
  className?: string;
}

export default function ServiceIcon({ name, className = 'w-6 h-6' }: ServiceIconProps) {
  const IconComponent = iconMap[name] || CompassIcon;
  return <IconComponent className={className} />;
}
