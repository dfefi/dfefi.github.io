#dfefi.github.io
<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="UTF-8" />

  <title>Lal Bahdur Website</title>
  <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      margin: 0;
      padding: 0;
      background: #e6ebf0;
      color: #333;
    }

    header {
      background: linear-gradient(90deg, #8ca6db, #b5d4bb);
      color: #1e2b3a;
      box-shadow: 0 4px 8px rgba(0,0,0,0.07);
      padding: 50px 20px;
    }

    header .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 900px;
      margin: 0 auto;
      gap: 20px;
    }

    header h1 {
      margin: 0;
      font-size: 2.8rem;
    }

    header p {
      margin-top: 10px;
      font-size: 1.2rem;
      color: #3d4f66;
    }

    header .text-content {
      flex: 1;
    }

    header .profile-photo {
      flex-shrink: 0;
    }

    header .profile-photo img {
      width: 220px;
      height: 220px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 4px 10px rgba(0,0,0,0.12);
      border: 2px solid #c6d8d4;
    }

    nav {
      background-color: #f2f4f5;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
      text-align: center;
      padding: 12px 0;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    nav a {
      margin: 0 20px;
      text-decoration: none;
      color: #52729b;
      font-weight: 600;
      transition: color 0.3s;
    }

    nav a:hover {
      color: #3b5a7a;
    }

    section {
      background-color: #ffffff;
      margin: 30px auto;
      max-width: 800px;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    }

    section h2 {
      margin-top: 0;
      color: #4a684e;
    }

    .about-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .profile-photo-about {
      flex-shrink: 0;
    }

    .profile-photo-about img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      border: 2px solid #b5d4bb;
    }

    ul {
      padding-left: 20px;
      color: #444;
    }

    a {
      color: #3a7656;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
      color: #28543f;
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #d6e2dc;
      color: #2e3c48;
      font-size: 14px;
      margin-top: 50px;
      border-top: 1px solid #bfcac4;
    }

    footer p {
      margin: 6px 0;
    }
  </style>
</head>
<body>

  <header>
    <div class="header-content">
      <div class="text-content">
        <h1>Lal Bahadur Gharti Magar</h1>
        <p>Software Developer</p>
      </div>
      <div class="profile-photo">
        <img src="myphoto.jpg" alt="Your Name" />
      </div>
    </div>
  </header>

  <nav>
    <a href="#about">About</a>
    <a href="#portfolio">Portfolio</a>
    <a href="#contact">Contact</a>
  </nav>

  <section id="about">
  <h2 style="margin-bottom: 0;">About Me</h2>
  <div class="about-content" style="margin-top: 0;">
    </div>
    <div style="margin-top: 0;">
      <p>Hello! I'm a passionate developer learning how to build websites from scratch. I enjoy coding, designing, and building things that live on the internet.</p>
    </div>
  </div>
</section>

  <section id="portfolio">
    <h2>Portfolio</h2>
    <ul>
      <li><strong>Calculator App</strong> – A simple, mobile-friendly calculator built with HTML/CSS/JS.</li>
      <li><strong>Blog Template</strong> – My first clean and minimal blog layout.</li>
      <li><strong>To-Do List</strong> – A task manager with local storage support.</li>
    </ul>
  </section>

  <section id="contact">
    <h2>Contact Me</h2>
    <p>Email: <a href="mailto:yourname@example.com">lalmagar698@gmail.com</a></p>
    <p>GitHub: <a href="https://github.com/yourusername" target="_blank">github.com/yourusername</a></p>
  </section>

  <footer>
    <p>&copy; 2025 Your Name. All rights reserved.</p>
    <p>Built with the help of AI tools.</p>
  </footer>

</body>
</html>
