// Footer.jsx
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const Footer = () => (
  <motion.footer 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.6, duration: 0.5 }}
    className="mt-6 text-center py-4 border-t border-green-100"
  >
    <div className="flex flex-col items-center justify-center">
      <div className="w-24 h-1 bg-gradient-to-b from-green-700 via-green-800 to-green-900 rounded-full mb-4"></div>
      <div className="flex items-center justify-center mb-2">
        <Leaf className="h-4 w-4 text-green-700 mr-1" />
        <p className="text-sm text-green-700">
          Help keep our communities clean by reporting roadside garbage
        </p>
      </div>
      <p className="text-xs text-green-600 mt-2">
        © {new Date().getFullYear()} Roadside Garbage Detection Project
      </p>
    </div>
  </motion.footer>
);

export default Footer;