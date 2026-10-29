import { useEffect, useState } from 'react';
import { company, process, services } from './data/company';

const navLinks = [
  ['A oficina', 'oficina'],
  ['Serviços', 'servicos'],
  ['Como funciona', 'processo'],
  ['Contato', 'contato'],
];

const Arrow = () => <span aria-hidden="true" className="arrow">↗</span>;

function MenuButton({ open, onClick }) {
  return (
    <button className="menu-button" type="button" onClick={onClick} aria-expanded={open} aria-controls="mobile-menu">
      <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
      <span />
      <span />
    </button>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 16);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="page-rail" aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#topo" className="brand" aria-label="AXIAL, página inicial">
          <span>AXIAL</span><i />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
        <a className="header-cta" href="#contato">Solicitar orçamento <Arrow /></a>
        <MenuButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
      </header>

      <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação mobile">
        {navLinks.map(([label, id]) => <a href={`#${id}`} onClick={closeMenu} key={id}>{label}<Arrow /></a>)}
        <a className="button solid" href="#contato" onClick={closeMenu}>Solicitar orçamento <Arrow /></a>
      </nav>

      <main id="topo">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title" className="reveal delay-1">Seu carro em<br /><em>boas mãos.</em></h1>
            <div className="hero-bottom reveal delay-2">
              <p>Diagnóstico e manutenção com explicações claras.</p>
              <div className="hero-actions">
                <a className="button solid" href="#contato">Agendar avaliação <Arrow /></a>
                <a className="text-link" href="#servicos">Ver serviços <Arrow /></a>
              </div>
            </div>
          </div>
          <figure className="hero-image reveal delay-1">
            <img src="/images/hero-garage.jpg" alt="Carro em manutenção em uma oficina" fetchPriority="high" />
            <figcaption><span>Diagnóstico e manutenção</span></figcaption>
          </figure>
        </section>

        <section id="oficina" className="intro section-shell section-pad" aria-labelledby="intro-title">
          <div className="intro-grid">
            <h2 id="intro-title">Menos ruído.<br />Mais <em>critério.</em></h2>
            <div className="intro-text">
              <p>Avaliamos o veículo, explicamos o que encontramos e alinhamos o serviço com você.</p>
              <a href="#processo" className="text-link">Como funciona <Arrow /></a>
            </div>
          </div>
          <div className="principles" aria-label="Princípios da oficina">
            <span>Diagnóstico antes de troca</span><span>Conversa sem jargão</span><span>Cuidado que acompanha o uso</span>
          </div>
        </section>

        <section id="servicos" className="services section-shell section-pad" aria-labelledby="services-title">
          <div className="section-heading">
            <h2 id="services-title">O que mantém<br />seu carro em <em>eixo.</em></h2>
            <span aria-hidden="true" />
          </div>
          <div className="service-list">
            {services.map(([title, description]) => (
              <article className="service-item" key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                <Arrow />
              </article>
            ))}
          </div>
        </section>

        <section id="processo" className="process section-shell section-pad" aria-labelledby="process-title">
          <div className="process-sticky">
            <h2 id="process-title">Sem mistério<br />do primeiro<br /><em>contato</em> à entrega.</h2>
            <p>Do primeiro contato à entrega do veículo.</p>
          </div>
          <ol className="process-list">
            {process.map(([title, description], index) => (
              <li key={title}>
                <span aria-hidden="true" />
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section id="contato" className="contact section-shell section-pad" aria-labelledby="contact-title">
          <div className="contact-intro">
            <h2 id="contact-title">Vamos olhar<br />isso de <em>perto.</em></h2>
            <a className="button lime" href={`https://wa.me/${company.whatsapp}?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.`} target="_blank" rel="noreferrer">Falar no WhatsApp <Arrow /></a>
          </div>
          <div className="contact-details">
            <iframe className="contact-map" title="Mapa da Rua Fernando Marinho Falcão, 65" src={company.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <div><p className="detail-label">Visite</p><a href={company.mapUrl} target="_blank" rel="noreferrer">{company.address}<Arrow /></a></div>
            <div><p className="detail-label">Ligue</p><a href={`tel:+551140001234`}>{company.phone}<Arrow /></a></div>
            <div><p className="detail-label">Horários</p>{company.hours.map(([day, time]) => <p className="hours" key={day}><span>{day}</span><span>{time}</span></p>)}</div>
            <p className="fictional-note">{company.note}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <div className="footer-brand"><span>AXIAL</span><i /></div>
        <div><p>Oficina independente em São Paulo.</p><small>{company.note}</small></div>
        <a href="#topo" className="text-link">Voltar ao topo <Arrow /></a>
      </footer>
    </>
  );
}

export default App;
