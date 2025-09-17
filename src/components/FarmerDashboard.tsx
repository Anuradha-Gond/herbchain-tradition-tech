import React, { useEffect, useRef, useState } from "react";

/*
Features:
- Voice commands (Web Speech API): "add batch", "history", "generate qr"
- Photo input (file->dataURL)
- GPS capture (geolocation)
- Submit POST /api/farmer/add-batch
- Get GET /api/farmer/history
*/

// Mock client and auth for demo
const client = {
  post: async (url: string, data: any) => ({ data: { qrDataUrl: "mock-qr", batch: data } }),
  get: async (url: string) => ({ data: { batches: [] } })
};

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type Batch = {
  _id: string;
  batchId: string;
  herbType: string;
  quantityKg: number;
  createdAt: string;
  status: string;
};

type Coordinates = {
  lat: number | null;
  lng: number | null;
};

export default function FarmerDashboard() {
  const [form, setForm] = useState({ herbType: "", quantityKg: "", notes: "" });
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [batches, setBatches] = useState<Batch[]>([]);
  const [qrImage, setQrImage] = useState(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    fetchHistory();
    // voice setup
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "hi-IN"; // or en-US
      recognitionRef.current.onresult = (e) => {
        const text = e.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(text);
      };
      recognitionRef.current.onend = () => setListening(false);
    }
  }, []);

  const handleVoiceStart = () => {
    if (!recognitionRef.current) return alert("Voice not supported");
    setListening(true);
    recognitionRef.current.start();
  };

  const handleVoiceStop = () => {
    if (!recognitionRef.current) return;
    setListening(false);
    recognitionRef.current.stop();
  };

  const handleVoiceCommand = (txt) => {
    if (txt.includes("add batch") || txt.includes("नई बैच")) {
      document.getElementById("herb-input")?.focus();
    } else if (txt.includes("history") || txt.includes("इतिहास")) {
      document
        .getElementById("batches-list")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (txt.includes("generate qr") || txt.includes("क्यूआर")) {
      if (batches[0]) generateQrFor(batches[0].batchId);
    } else {
      // no op
    }
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoDataUrl(ev.target?.result as string || "");
    reader.readAsDataURL(file);
  };

  const captureGps = (): Promise<Coordinates> =>
    new Promise((resolve) => {
      if (!navigator.geolocation) resolve({ lat: null, lng: null });
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => resolve({ lat: null, lng: null }),
        { enableHighAccuracy: true, maximumAge: 60_000 }
      );
    });

  const submitBatch = async (e) => {
    e.preventDefault();
    try {
      const coords = await captureGps();
      const payload = {
        herbType: form.herbType,
        quantityKg: Number(form.quantityKg),
        photoUrl: photoDataUrl,
        gps: coords,
        notes: form.notes,
      };
      const res = await client.post("/api/farmer/add-batch", payload);
      alert("Batch created");
      // backend returns qrDataUrl and batch object in our earlier backend
      if (res.data.qrDataUrl) setQrImage(res.data.qrDataUrl);
      fetchHistory();
      setForm({ herbType: "", quantityKg: "", notes: "" });
      setPhotoDataUrl("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Create batch failed");
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await client.get("/api/farmer/history");
      setBatches(res.data.batches || []);
    } catch (err) {
      console.error(err);
    }
  };

  const generateQrFor = async (batchId) => {
    // This endpoint isn't separate — earlier backend returns qrDataUrl on batch creation.
    // We'll try to fetch batch and show its qrPayload if present.
    try {
      const res = await client.get(`/api/farmer/batch/${batchId}`);
      if (res.data.batches?.length > 0) {
        // generate QR here from payload if needed, but backend returned qrDataUrl when creating.
        // For demo: show the batch.qrPayload as text and rely on server creation
        alert(
          "Batch found. Use QR returned at creation or recreate on server."
        );
      }
    } catch (err) {
      alert("Could not generate QR");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Farmer Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">
            Track your herbal harvests with blockchain transparency
          </p>
        </div>
        
        <div className="mb-8 flex gap-4 justify-center">
          <button
            onClick={() => (listening ? handleVoiceStop() : handleVoiceStart())}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-soft ${
              listening 
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" 
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-medium"
            }`}
          >
            {listening ? "Listening..." : "Voice Commands"}
          </button>
          <button
            onClick={fetchHistory}
            className="px-6 py-3 rounded-lg font-medium bg-card text-card-foreground border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-soft hover:shadow-medium"
          >
            Refresh History
          </button>
        </div>

        <form
          onSubmit={submitBatch}
          className="bg-card rounded-xl p-8 shadow-large mb-8 border border-border"
        >
          <h3 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-gradient-hero rounded-full"></span>
            Add New Batch
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Herb Type
              </label>
              <input
                id="herb-input"
                required
                value={form.herbType}
                onChange={(e) => setForm((f) => ({ ...f, herbType: e.target.value }))}
                className="w-full border border-input bg-background rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="e.g. Ashwagandha"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Quantity (kg)
              </label>
              <input
                required
                value={form.quantityKg}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantityKg: e.target.value }))
                }
                type="number"
                className="w-full border border-input bg-background rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                placeholder="Enter quantity"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Photo Upload
            </label>
            <input
              accept="image/*"
              type="file"
              onChange={handlePhoto}
              className="w-full text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:font-medium hover:file:bg-primary/90 file:cursor-pointer cursor-pointer"
            />
            {photoDataUrl && (
              <div className="mt-4">
                <img
                  src={photoDataUrl}
                  className="w-40 h-40 object-cover rounded-xl border-2 border-border shadow-medium"
                  alt="Herb photo"
                />
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Additional Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="w-full border border-input bg-background rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none"
              rows={3}
              placeholder="Any special cultivation notes..."
            />
          </div>
          
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-hero text-primary-foreground rounded-lg font-semibold hover:shadow-large transition-all duration-300 transform hover:scale-[1.02]"
            >
              Submit Batch
            </button>
            <button
              type="button"
              onClick={async () => {
                const coords = await captureGps();
                alert(`GPS: ${coords.lat}, ${coords.lng}`);
              }}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-all duration-300 shadow-soft hover:shadow-medium"
            >
              Capture GPS
            </button>
          </div>
        </form>

        {qrImage && (
          <div className="bg-card rounded-xl p-6 shadow-large mb-8 border border-border text-center">
            <h3 className="text-xl font-semibold text-card-foreground mb-4">Generated QR Code</h3>
            <div className="inline-block p-4 bg-background rounded-lg border border-border">
              <img src={qrImage} alt="qr" className="w-48 h-48 mx-auto" />
            </div>
          </div>
        )}

        <div id="batches-list" className="bg-card rounded-xl p-8 shadow-large border border-border">
          <h3 className="text-2xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-gradient-hero rounded-full"></span>
            Batch History
          </h3>
          {batches.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg">No batches recorded yet</div>
              <div className="text-muted-foreground/70 text-sm mt-2">Your submitted batches will appear here</div>
            </div>
          ) : (
            <div className="space-y-4">
              {batches.map((b) => (
                <div
                  key={b._id}
                  className="border border-border rounded-lg p-6 hover:shadow-medium transition-all duration-300 bg-background/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="font-bold text-lg text-foreground mb-1">
                        {b.herbType}
                      </div>
                      <div className="text-muted-foreground mb-2">
                        <span className="font-medium">{b.quantityKg} kg</span> • {new Date(b.createdAt).toLocaleString()}
                      </div>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        Status: {b.status}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Batch ID</div>
                      <div className="text-sm font-mono bg-muted px-3 py-1 rounded border">
                        {b.batchId}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}