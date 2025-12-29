import React from 'react';
import './About.css';

const About = () => {
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Video autoplay failed:", error);
            });
        }
    }, []);

    // Fashion-themed images for the marquee (Reliable Pexels Source)
    // Fashion-themed images for the marquee (Reliable Pexels Source)
    const mediaItems = [
        { type: 'image', src: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { type: 'video', src: 'https://videos.pexels.com/video-files/3205917/3205917-uhd_2560_1440_25fps.mp4' },
        { type: 'image', src: 'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { type: 'image', src: 'https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { type: 'image', src: 'https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=600' },
        { type: 'image', src: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600' },
    ];

    // duplicate items for smooth infinite scroll
    const marqueeItems = [...mediaItems, ...mediaItems];

    return (
        <div className="about-page fade-in">
            {/* Background Video */}
            <div className="video-background-container">
                <video
                    ref={videoRef}
                    className="video-background"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
                    onEnded={() => {
                        if (videoRef.current) videoRef.current.play();
                    }}
                >
                    {/* Reliable 15s Fashion Loop */}
                    <source src="https://videos.pexels.com/video-files/3205917/3205917-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
            </div>

            <div className="about-content py-5">
                {/* Hero Section */}
                <div className="container text-center mb-5">
                    <h5 className="text-uppercase letter-spacing-tight fw-bold mb-3 text-white">Our Story</h5>
                    <h1 className="display-4 fw-bold mb-4 text-white">Crafting the Future of <span className="text-primary">E-Commerce</span></h1>
                    <p className="lead hero-text">
                        Founded in 2024, ShopNow started with a simple mission: to make premium quality products accessible to everyone.
                        We believe in design that inspires and technology that simplifies.
                    </p>
                </div>

                {/* Media Marquee Section */}
                <div className="media-marquee-container mb-5 py-4">
                    <div className="media-marquee">
                        {marqueeItems.map((item, index) => (
                            <div key={index} className="media-item shadow-sm">
                                {item.type === 'video' ? (
                                    <video src={item.src} autoPlay loop muted playsInline className="w-100 h-100 object-fit-cover"></video>
                                ) : (
                                    <img src={item.src} alt={`Gallery item ${index}`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Core Values */}
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="about-feature p-4 text-center">
                                <div className="mb-3">
                                    <i className="bi bi-gem fs-1 text-primary"></i>
                                </div>
                                <h3 className="text-white">Premium Quality</h3>
                                <p className="text-light opacity-75">
                                    We select only the finest materials and partner with top-tier manufacturers to ensure every product meets our high standards.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-feature p-4 text-center">
                                <div className="mb-3">
                                    <i className="bi bi-globe-americas fs-1 text-primary"></i>
                                </div>
                                <h3 className="text-white">Sustainable Choice</h3>
                                <p className="text-light opacity-75">
                                    We are committed to reducing our carbon footprint by using eco-friendly packaging and carbon-neutral shipping options.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-feature p-4 text-center">
                                <div className="mb-3">
                                    <i className="bi bi-people fs-1 text-primary"></i>
                                </div>
                                <h3 className="text-white">Customer First</h3>
                                <p className="text-light opacity-75">
                                    Your happiness is our priority. Our dedicated support team is available 24/7 to assist with any questions or concerns.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Video / Call to Action Section */}
                <div className="container py-5">
                    <div className="join-community-card rounded-4 p-5 text-center shadow-soft">
                        <h2 className="mb-4 text-white fw-bold">Join Our Community</h2>
                        <p className="text-white mb-4 fw-medium" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            Follow us on social media for behind-the-scenes content, exclusive offers, and a peek into our design process.
                        </p>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-primary rounded-pill px-4">
                                <i className="bi bi-instagram me-2"></i> Instagram
                            </button>
                            <button className="btn btn-outline-primary rounded-pill px-4">
                                <i className="bi bi-twitter-x me-2"></i> Twitter
                            </button>
                            <button className="btn btn-primary rounded-pill px-4">
                                <i className="bi bi-youtube me-2"></i> Watch Our Story
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
