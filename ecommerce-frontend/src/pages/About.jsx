const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CDAC-Mart</h1>
          <p className="text-xl text-gray-600">Your Digital Shopping Destination</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Welcome to our E-Commerce App!
We created this platform to offer a simple and convenient online shopping experience. Our goal is to provide users with an easy way to browse products, add items to their cart, and place orders in just a few clicks.

This app is designed to be user-friendly, fast, and reliable. Whether you are exploring new products or purchasing your favorites, we aim to make your shopping experience smooth and enjoyable.

Thank you for visiting our store!
          </p>
          <p className="text-gray-700">
            Built with React.js frontend and Spring Boot backend, CDAC-Mart demonstrates the integration 
            of modern web technologies to create a seamless shopping experience for users.
          </p>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-700">
              To provide a comprehensive e-commerce solution that demonstrates the skills and knowledge 
              gained through the CDAC program, while delivering a user-friendly shopping experience.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Technology Stack</h3>
            <ul className="text-gray-700 space-y-1">
              <li>• React.js with Vite</li>
              <li>• Spring Boot Backend</li>
              <li>• Redux for State Management</li>
              <li>• Tailwind CSS for Styling</li>
              <li>• MySQL Database</li>
            </ul>
          </div>
        </div> */}

        {/* Meet Our Developer Team */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet Our Developer Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="../../images/WhatsApp Image 2025-12-01 at 23.00.19.jpeg"
                alt="Rahul Sharma"
                className="w-48 h-56 mx-auto mb-4 object-cover"
                style={{ borderRadius: '50% / 60%' }}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dhiraj Patil</h3>
              {/* <p className="text-blue-600 font-medium mb-2">Full Stack Developer</p>
              <p className="text-gray-600 text-sm">
                Specialized in React.js and Spring Boot development. 
                Passionate about creating scalable web applications.
              </p> */}
            </div>

            <div className="text-center">
              <img
                src="../../images/WhatsApp Image 2025-12-02 at 01.14.34.jpeg"
                alt="Bhavna Balpande"
                className="w-48 h-56 mx-auto mb-4 object-cover"
                style={{ borderRadius: '50% / 60%' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/192x224/10B981/ffffff?text=PP';
                }}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bhavna Balpande</h3>
              {/* <p className="text-blue-600 font-medium mb-2">Frontend Developer</p>
              <p className="text-gray-600 text-sm">
                Expert in UI/UX design and React development. 
                Focused on creating beautiful and responsive interfaces.
              </p> */}
            </div>

            <div className="text-center">
              <img
                src="../../images/Suraj.png"
                alt="Amit Kumar"
                className="w-48 h-56 mx-auto mb-4 object-cover"
                style={{ borderRadius: '50% / 60%' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/192x224/F59E0B/ffffff?text=AK';
                }}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Suraj Rawat</h3>
              {/* <p className="text-blue-600 font-medium mb-2">Backend Developer</p>
              <p className="text-gray-600 text-sm">
                Specialized in Spring Boot and database design. 
                Ensures robust and secure backend architecture.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;