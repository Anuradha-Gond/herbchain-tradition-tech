import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-herbs.jpg";
import farmerDashboard from "@/assets/farmer-dashboard.jpg";
import qrScanMobile from "@/assets/qr-scan-mobile.jpg";
import processorDashboard from "@/assets/processor-dashboard.jpg";
import consumerApp from "@/assets/consumer-app.jpg";
import { 
  Shield, 
  MapPin, 
  Smartphone, 
  Users, 
  Leaf, 
  CheckCircle,
  Eye,
  Lock,
  ArrowRight,
  Zap
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">HerbChain</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#roles" className="text-muted-foreground hover:text-primary transition-colors">Roles</a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <Button variant="outline">Log In</Button>
            <Button>Join Us</Button>
          </div>
        </div>
      </nav>

      <main className="py-20">
        {/* Hero Section - User's existing code with enhanced styling */}
        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Badge variant="outline" className="mb-6 bg-primary-light border-primary text-primary-dark">
              Free Traceability Solution
            </Badge>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold text-primary-dark leading-tight"
            >
              Trust Ayurveda with{" "}
              <span className="text-primary bg-gradient-hero bg-clip-text text-transparent">Blockchain</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg text-muted-foreground"
            >
              HerbChain brings transparency, provenance and authenticity to
              Ayurvedic herbs — from farmer fields to consumer hands.
            </motion.p>

            <div className="mt-8 flex gap-4">
              <Link to="/select-role">
                <Button size="lg" className="shadow-medium hover:shadow-large transition-all">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <a href="#features" className="flex items-center">
                  Learn More
                  <Eye className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Blockchain Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Geo-verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">AI Verified</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 shadow-large">
            <div className="h-64 md:h-80 rounded-xl overflow-hidden">
              <img
                src={heroImage}
                alt="Ayurvedic herbs with blockchain technology"
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
          </div>
        </section>

        {/* QR Code Demo Section - Inspired by reference */}
        <section className="py-24 bg-muted/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  The truth shouldn't be hidden{" "}
                  <span className="text-muted-foreground text-lg">in fine print.</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  HerbChain is a free platform that shows the full story of Ayurvedic herbs with just one QR code scan.
                </p>
                <Button size="lg" className="group">
                  See it in Action
                  <Zap className="ml-2 h-4 w-4 group-hover:animate-pulse" />
                </Button>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-large">
                  <img
                    src={qrScanMobile}
                    alt="Mobile QR scanning interface"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                It should be one scan away.
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete transparency and traceability for every Ayurvedic product in the supply chain.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-medium hover:shadow-large transition-all">
                <CardContent className="p-8">
                  <div className="bg-primary-light rounded-lg p-3 w-fit mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Blockchain Security</h3>
                  <p className="text-muted-foreground">
                    Immutable records ensure data integrity from farm to consumer using advanced blockchain technology.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-medium hover:shadow-large transition-all">
                <CardContent className="p-8">
                  <div className="bg-primary-light rounded-lg p-3 w-fit mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Geo-verification</h3>
                  <p className="text-muted-foreground">
                    GPS tracking and geo-tagging verify the exact origin and location of every herb batch.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-medium hover:shadow-large transition-all">
                <CardContent className="p-8">
                  <div className="bg-primary-light rounded-lg p-3 w-fit mb-4">
                    <Smartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">QR Authentication</h3>
                  <p className="text-muted-foreground">
                    Simple QR code scanning provides instant access to complete herb lifecycle information.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Dashboard Roles Section */}
        <section id="roles" className="py-24 bg-muted/50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Dashboards for Every Role
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Specialized interfaces designed for each stakeholder in the Ayurvedic supply chain.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-medium hover:shadow-large transition-all overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={farmerDashboard}
                    alt="Farmer Dashboard Interface"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-xl font-semibold">Farmer Portal</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Upload cultivation data, geo-tagged photos, and digital certificates for complete farm-to-market tracking.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-medium hover:shadow-large transition-all overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={processorDashboard}
                    alt="Processor Dashboard Interface"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Lock className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-xl font-semibold">Processor & Distributor</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Manage batch processing, quality verification, and supply chain updates with secure authentication.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-medium hover:shadow-large transition-all overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={consumerApp}
                    alt="Consumer App Interface"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Smartphone className="h-5 w-5 text-primary mr-2" />
                      <h3 className="text-xl font-semibold">Consumer App</h3>
                    </div>
                    <p className="text-muted-foreground">
                      Scan QR codes to verify authenticity and view complete herb lifecycle information instantly.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-medium hover:shadow-large transition-all">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">Regulator Access</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Government agencies and third-party certifiers can audit batches, upload digital certificates, and ensure compliance.
                  </p>
                  <Button variant="outline" className="w-fit">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  About HerbChain
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  We're building the future of Ayurvedic medicine through transparency and trust. Our mission is to strengthen consumer confidence in traditional Indian medicine while empowering farmers and manufacturers with cutting-edge technology.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  By combining blockchain technology with AI and geo-verification, we're creating a tamper-proof system that ensures every Ayurvedic product can be traced back to its authentic source.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Strengthening Global Trust</h4>
                      <p className="text-muted-foreground">Positioning India as the world leader in authentic Ayurvedic medicine.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Empowering Farmers</h4>
                      <p className="text-muted-foreground">Providing fair recognition and transparent value chain participation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold mb-1">Protecting Consumers</h4>
                      <p className="text-muted-foreground">Ensuring authenticity and preventing adulteration through technology.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-card rounded-2xl p-8 shadow-large">
                <div className="text-center">
                  <div className="bg-primary-light rounded-full p-6 w-fit mx-auto mb-6">
                    <Leaf className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">SIH 2025</h3>
                  <p className="text-muted-foreground mb-6">
                    Developed for Smart India Hackathon 2025, Problem Statement ID: 25027
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary">UN SDGs</div>
                      <div className="text-sm text-muted-foreground">Aligned</div>
                    </div>
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">Traceable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 bg-gradient-hero">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Ayurvedic Supply Chain?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of farmers, processors, and consumers building a transparent future for traditional medicine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/select-role">
                <Button size="lg" variant="secondary" className="shadow-large hover:shadow-xl transition-all">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Request Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6" />
                <span className="text-xl font-bold">HerbChain</span>
              </div>
              <p className="text-white/80 text-sm">
                Bringing transparency and trust to Ayurvedic medicine through blockchain technology.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Farmer Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Processor Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consumer App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Regulator Access</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2025 HerbChain. Built for Smart India Hackathon 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}