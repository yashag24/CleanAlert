// MainCard.jsx
import { motion } from 'framer-motion';
import UploadArea from './UploadArea';
import UploadButton from './UploadButton';
import ErrorMessage from './ErrorMessage';
import AnalysisResults from './AnalysisResults';
import { useAppContext } from '../../context/AppContext';
import { Leaf } from 'lucide-react';

const MainCard = () => {
  const { preview, result, error } = useAppContext();

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-lg shadow-xl overflow-hidden backdrop-blur-sm bg-opacity-95 border border-green-100 flex-1"
    >
      {/* Card Header */}
      <div className="bg-gradient-to-b from-green-800 via-green-800 to-green-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Leaf className="h-5 w-5 text-green-100 mr-2 transition-transform duration-300 hover:scale-110" />
          <h2 className="text-white font-bold text-lg">Image Analysis</h2>
        </div>
        <div className="flex space-x-1">
          <motion.span
            whileHover={{ scale: 1.2 }}
            className="h-3 w-3 rounded-full bg-red-400"
          />
          <motion.span
            whileHover={{ scale: 1.2 }}
            className="h-3 w-3 rounded-full bg-yellow-400"
          />
          <motion.span
            whileHover={{ scale: 1.2 }}
            className="h-3 w-3 rounded-full bg-green-400"
          />
        </div>
      </div>

      {/* Upload Section */}
      <section className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <UploadArea />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <UploadButton />
        </motion.div>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ErrorMessage />
          </motion.div>
        )}
      </section>

      {/* Results Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <AnalysisResults />
        </motion.div>
      )}
    </motion.main>
  );
};

export default MainCard;