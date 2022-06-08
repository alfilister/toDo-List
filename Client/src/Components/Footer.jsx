import React from "react";

function Footer() {
  return (
    <footer className="footerBar">
      <h4>
        Web App developed by <span>Jorge Castillo</span>
      </h4>
      <div className="contactIcons">
        <i
          class="fa-brands fa-github"
          onClick={() => window.open("https://github.com/alfilister", "_blank")}
        ></i>
        <i
          class="fa-brands fa-telegram"
          onClick={() => window.open("https://t.me/JayMario", "_blank")}
        ></i>
        <i
          class="fa-brands fa-linkedin"
          onClick={() =>
            window.open("https://www.linkedin.com/in/jota-castillo/", "_blank")
          }
        ></i>
      </div>
    </footer>
  );
}

export default Footer;
