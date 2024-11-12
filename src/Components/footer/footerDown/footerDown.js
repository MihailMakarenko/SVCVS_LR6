import "./footerDown.css";

function FooterDown() {
  return (
    <div>
      <SocialNetwork></SocialNetwork>
      <div className="ancors">
        <a href={"http://moodle.bru.by/"}>Согласие на обработку данных</a>
        <a href={"http://moodle.bru.by/"}>Служба поддержки</a>
        <a href={"http://moodle.bru.by/"}>Политика конфиденциальности</a>
      </div>
    </div>
  );
}

function SocialNetwork() {
  return (
    <div className="social-network">
      <LogoSocialNetwork
        href="rst"
        src="../img/Facebook.png"
      ></LogoSocialNetwork>
      <LogoSocialNetwork href="rst" src="../img/Vk.png"></LogoSocialNetwork>
      <LogoSocialNetwork
        href="rst"
        src="../img/Twitter.png"
      ></LogoSocialNetwork>
      <LogoSocialNetwork
        href="rst"
        src="../img/Youtube 1.png"
      ></LogoSocialNetwork>
    </div>
  );
}

function LogoSocialNetwork(props) {
  return (
    <a href={props.href}>
      <img className="Logo" src={props.src} alt={props.alt} />
    </a>
  );
}
export default FooterDown;
