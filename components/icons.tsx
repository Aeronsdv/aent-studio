import { 
  BookOpen, 
  CreditCard, 
  HelpCircle, 
  Lightbulb, 
  Map, 
  MessageSquare, 
  Pencil, 
  Users,
  ChevronDown
} from "lucide-react";
import * as React from "react";

// Lucide Icon mappings for Hugeicons compatibility
export const Book01Icon = BookOpen;
export const CreditCardIcon = CreditCard;
export const HelpCircleIcon = HelpCircle;
export const Idea01Icon = Lightbulb;
export const MapsIcon = Map;
export const Message01Icon = MessageSquare;
export const PencilIcon = Pencil;
export const UserGroupIcon = Users;
export const ArrowDown01Icon = ChevronDown;

interface HugeiconsIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: React.ComponentType<any>;
  size?: number;
  className?: string;
}

// Backward compatible Hugeicons wrapper rendering Lucide icons
export function HugeiconsIcon({ icon: Icon, size = 20, className, ...props }: HugeiconsIconProps) {
  if (!Icon) return null;
  return <Icon size={size} className={className} {...props} />;
}
