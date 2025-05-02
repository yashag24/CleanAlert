import { useAppContext } from '../../context/AppContext';
import { Upload, X } from 'lucide-react';

const UploadArea = () => {
  const { preview, file, handleFileChange, handleFileInputClick } = useAppContext();

  return (
    <div className="relative group">
      <div className={`relative border-2 rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
        preview ? 'border-green-200 bg-green-50' : 
        'border-dashed border-green-300 hover:border-green-500 hover:bg-green-50'
      }`}>
        {!preview ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <div className="mb-3 p-3 rounded-full bg-gradient-to-b from-green-700 via-green-800 to-green-900 text-white">
              <Upload className="h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <p className="text-base font-medium text-green-900">
              Drag & drop an image
            </p>
            <p className="text-sm text-green-700 mb-2">
              or click to browse files
            </p>
            <p className="text-xs text-green-600">
              Supported formats: JPG, PNG, JPEG (max 5MB)
            </p>
          </div>
        ) : (
          <div className="p-4">
            <div className="relative w-full rounded-lg overflow-hidden shadow-md aspect-video flex items-center justify-center bg-green-50">
              <img
                src={preview}
                alt="Preview"
                className="max-h-64 max-w-full object-contain"
              />
              <button
                onClick={handleFileInputClick}
                className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-red-100 transition-all duration-300 ease-out"
                aria-label="Remove image"
              >
                <X className="h-4 w-4 text-red-500 transition-transform duration-300 hover:scale-110" />
              </button>
              <div className="absolute bottom-2 left-2 bg-green-900 bg-opacity-70 px-2 py-1 rounded text-xs text-white">
                {file?.name}
              </div>
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          onClick={(e) => (e.target.value = null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ pointerEvents: "auto" }}
          aria-label="Upload an image"
        />
      </div>
    </div>
  );
};

export default UploadArea;