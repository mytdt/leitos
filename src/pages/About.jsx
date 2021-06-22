import React from 'react';
import Collapsible from 'react-collapsible';

import CardProfile from '../components/about/Profile';

import Git from '../services/Git';

import '../styles/About.scss';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contributors: [],
      FAQ: [],
    };

    this.componentIsMounted = false;
  }

  componentDidMount() {
    this.componentIsMounted = true;

    this.getFAQ();
    this.contributors();
  }

  componentWillUnmount() {
    this.componentIsMounted = false;
  }

  async getFAQ() {
    const FAQ = await fetch('/data/faq.json')
      .then((response) => response.json())
      .then((json) => json);

    if (!this.componentIsMounted) {
      return;
    }

    this.setState({
      FAQ,
    });
  }

  async contributors() {
    let contributors = await Git.getContributors();

    contributors = await Promise.all(
      contributors.map(({ login }) => Git.getSingleContributor(login)),
    );

    if (!this.componentIsMounted) {
      return;
    }

    this.setState({
      contributors,
    });
  }

  render() {
    const { contributors, FAQ } = this.state;

    return (
      <div className="about-container">
        <div className="about">
          <h1>Sobre o projeto</h1>
          <p>
            Esse projeto foi desenvolvido voluntariamente a fim de trazer dados sobre
            os leitos nos hospitais do Brasil. Tais dados incluem oferta e ocupação
            de leitos clínicos, de leitos de UTI e ainda informações de altas e óbitos.
          </p>
          <p>
            Os dados são originados do openDataSUS que é um banco de dados alimentado
            pelos próprios hospitais. Portanto, toda informação disponibilizada pela
            aplicação tem confiabilidade e credibilidade do Sistema Único de Saúde.
          </p>
        </div>

        <div className="faq">
          <h1>FAQ</h1>
          {
            FAQ.map((faqItem, index) => (
              <Collapsible
                key={ index }
                trigger={ faqItem.question }
                transitionTime="350"
                easing="ease"
              >
                { faqItem.answer }
              </Collapsible>
            ))
          }
        </div>

        <div className="contributors">
          <h1>Colaboradores</h1>
          {
            contributors.map((item) => (
              <CardProfile key={ item.login } contributor={ item } />
            ))
          }
        </div>
      </div>
    );
  }
}

export default About;
