// Cloudinary Upload Adapter for CKEditor 5
// Uses unsigned upload preset (recommended for client-side). Do NOT expose API secret here.
// Setup:
// 1. Create an unsigned upload preset in Cloudinary (Settings > Upload > Upload presets).
// 2. Allow only needed formats (e.g. jpg, png, webp) and set folder if desired (e.g. intraverse/posts).
// 3. Add Vite env vars:
//    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
//    VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
// 4. (Optional) Add VITE_CLOUDINARY_FOLDER=intraverse/posts

class CloudinaryAdapter {
  constructor(loader, { cloudName, uploadPreset, folder }) {
    this.loader = loader;
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
    this.folder = folder;
    this.abortController = new AbortController();
  }

  upload() {
    return this.loader.file.then((file) => {
      return new Promise((resolve, reject) => {
        if (!this.cloudName || !this.uploadPreset) {
          reject("Cloudinary config missing. Set VITE_CLOUDINARY_CLOUD_NAME & VITE_CLOUDINARY_UPLOAD_PRESET.");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", this.uploadPreset);
        if (this.folder) formData.append("folder", this.folder);
        // Optional: transformation example (resize & auto format)
        // formData.append("transformation", "c_limit,w_1600,f_auto,q_auto");

        fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
          method: "POST",
            body: formData,
            signal: this.abortController.signal,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              reject(data.error.message || "Upload failed");
              return;
            }
            resolve({ default: data.secure_url });
          })
          .catch((err) => {
            if (err.name === "AbortError") return;
            reject(err.message || "Upload failed");
          });
      });
    });
  }

  abort() {
    this.abortController.abort();
  }
}

export default function CloudinaryUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new CloudinaryAdapter(loader, {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      folder: import.meta.env.VITE_CLOUDINARY_FOLDER,
    });
  };
}
