import React from 'react';
import './aboutStyle.css';
import Git from '../services/Git';
import CardProfile from '../components/AboutCardProfile';

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contributors: [],
    };

    this.isMountedComponent = false;
  }

  componentDidMount() {
    this.isMountedComponent = true;

    this.contributors();
  }

  componentWillUnmount() {
    this.isMountedComponent = false;
  }

  async contributors() {
    const contributors = await Git.getContributors();

    if (!this.isMountedComponent) {
      return;
    }

    this.setState({
      contributors,
    });
  }

  render() {
    const { contributors } = this.state;

    return (
      <main className="main-about">
        <section className="about-leitos">
          <h1>Sobre o projeto Leitos</h1>
          <p>
            Esse projeto foi desenvolvido voluntariamente a fim de trazer dados sobre
            os leitos nos hospitais pelo Brasil. Tais dados incluem  ocupação e oferta
            de leitos clínicos e leitos de uti.
          </p>
          <p>
            Utilizamos o DataSus, o banco de dados alimentado pelos hospitais do
            Brasil. Portanto toda informação disponibilizada pela nossa aplicação tem
            confiabilidade e credibilidade do Sistema Único de Saúde.
          </p>
        </section>
        <section className="faq-leitos">
          <h1>FAQ</h1>
          <details open>
            <summary>
              Por que os número de leitos ocupados são maiores que os ofertados?
            </summary>
            <div>
              Nós dedusimos que o número de leitos ofertados foram introduzidos
              antes do ápice da pandemia. E com a correria nos hospitais os
              servidores apenas estão informando o número de leitos ocupados,
              mesmo que outros estejam sendo criados, já são infromados como
              ocupados.
            </div>
          </details>
          <details>
            <summary>
              Essas informçãoes estão atualizadas?
            </summary>
            <div>
              Todas as informações disponíveis foram passadas pelos os próprios
              hospitais, logo algumas então atualizadas, outras não.
            </div>
          </details>
          <details>
            <summary>
              Como posso verificar a data da última atualização?
            </summary>
            <div>
              Para verificar a útima atualização, basta você clicar em Mais detalhes
              na página da cidade que você está pesquisando.
            </div>
          </details>
        </section>
        <section className="collaborator-leitos">
          <h1>
            Colaboradores
          </h1>
          {
            contributors.map((contributor) => {
              const { login } = contributor;
              return <CardProfile key={ login } login={ login } />;
            })
          }
        </section>
      </main>
    );
  }
}
