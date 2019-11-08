'use strict';

const {
  Component,
  Children,
  Fragment
} = React;
const {
  render
} = ReactDOM;

class EmailSignature extends Component {
  render = () => {
    const defaultTableStyle = {
      backgroundColor: '#FFF',
      border: 'none',
      color: '#000',
      fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
      fontSize: '12px',
      margin: '0',
      padding: '0',
      maxWidth: '505px'
    };
    const defaultInheritStyle = {
      backgroundColor: 'inherit',
      border: 'inherit',
      margin: 'inherit',
      padding: 'inherit',
      width: '100%'
    };
    const fullNameStyle = {
      fontSize: '24px'
    };
    const positionStyle = {
      color: '#606060',
      fontSize: '16px',
      padding: '0'
    };
    const logoStyle = {
      maxWidth: '100px'
    };
    const contactsStyle = {
      margin: '5px 0'
    };
    const defaultLinkStyle = {
      color: '#606060',
      textDecoration: 'none'
    };
    const confidentialMessageStyle = {
      fontSize: '10px',
      margin: '0'
    };
    const {
      id,
      firstName,
      lastName,
      position,
      phone,
      emailAddress
    } = this.props;
    return (
      <table id={id} style={defaultTableStyle}>
        <tbody style={defaultInheritStyle}>
          <tr style={defaultInheritStyle}>
            <td style={defaultInheritStyle}>Ma te wa,</td>
          </tr>
          <tr style={defaultInheritStyle}>
            <td style={defaultInheritStyle}>
              <table style={defaultInheritStyle}>
                <tbody style={defaultInheritStyle}>
                  <tr style={defaultInheritStyle}>
                    <td>
                      <p style={defaultInheritStyle}>
                        <span style={fullNameStyle}>
                          <b>{`${firstName} ${lastName}`}</b>
                          <br />
                          <i style={positionStyle}>{position}</i>
                        </span>
                      </p>
                    </td>
                    <td>
                      <a href="https://PikiTech.co.nz">
                        <img
                          alt="Piki Tech Logo"
                          src="https://avatars.mds.yandex.net/get-mail-signature/1597781/2fa69693308aaccca35f9a7ead383e9d/orig"
                          style={logoStyle}
                        />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={contactsStyle}>
                <b>M:</b>&nbsp;
                <a href={`tel:${phone}`} style={defaultLinkStyle}>{phone}</a>
                &nbsp;
                <b>E:</b>&nbsp;
                <a href={`mailto:${emailAddress}`} style={defaultLinkStyle}>{emailAddress}</a>
                &nbsp;
                <b>W:</b>&nbsp;
                <a href="https://PikiTech.co.nz" style={defaultLinkStyle}>PikiTech.co.nz</a>
              </p>
            </td>
          </tr>
          <tr style={defaultInheritStyle}>
            <td colSpan="2" style={defaultInheritStyle}>
              <i style={confidentialMessageStyle}>The content of this message is confidential. If you have received it by mistake, please inform us by an email reply and then delete the message. It is forbidden to copy, forward, or in any way reveal the contents of this message to anyone. The integrity and security of this email cannot be guaranteed over the Internet. Therefore, the sender will not be held liable for any damage caused by the message.</i>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isGenerating: false,
      isGenerated: false,
      appFirstName: '',
      appLastName: '',
      appPosition: '',
      appPhone: '',
      appEmailAddress: '',
      lastElementNameUpdated: ''
    };
  }
  componentDidMount = () => {
    this.setState({
      isLoading: false
    });
  }
  componentDidUpdate = (prevProps, prevState) => {
    const {
      appFirstName: prevAppFirstName,
      appLastName: prevAppLastName,
      appEmailAddress: prevAppEmailAddress
    } = prevState;
    const prevSuggestedEmailAddress = `${prevAppFirstName}.${prevAppLastName}@PikiTech.co.nz`;
    const {
      appFirstName,
      appLastName,
      appEmailAddress,
      lastElementNameUpdated
    } = this.state;
    const suggestedEmailAddress = `${appFirstName}.${appLastName}@PikiTech.co.nz`;
    if (appFirstName &&
      appLastName &&
      lastElementNameUpdated !== 'appEmailAddress' &&
      appEmailAddress !== suggestedEmailAddress &&
      (!appEmailAddress || prevAppEmailAddress === prevSuggestedEmailAddress)) {
      this.setState({
        appEmailAddress: suggestedEmailAddress
      });
    }
  }
  handleElementChange = e => {
    e.preventDefault();
    const {
      target: element
    } = e;
    const {
      name,
      value
    } = element;
    this.setState({
      [name]: value,
      lastElementNameUpdated: name
    });
  }
  handleFormSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    const {
      currentTarget: form
    } = e;
    const isFormValid = form.checkValidity();
    form.classList.add('was-validated');
    if (isFormValid) {
      this.setState({
        isGenerating: true
      }, this.generateEmailSignature);
    }
  }
  generateEmailSignature = () => {
    this.setState({
      isGenerating: false
    }, this.handleClearGeneratingInterval);
  }
  handleClearGeneratingInterval = () => {
    this.setState({
      isGenerated: true
    });
  }
  handleResetClick = e => {
    const {
      form
    } = e.currentTarget;
    const copyToClipboardButton = document.getElementById('copyToClipboardButton');
    const copyToClipboardButtonIcon = copyToClipboardButton.querySelector('.fa');
    const {
      classList: copyToClipboardButtonIconClassList
    } = copyToClipboardButtonIcon;
    form.classList.remove('was-validated');
    copyToClipboardButtonIconClassList.add('fa-clipboard');
    copyToClipboardButtonIconClassList.remove('fa-check');
    this.setState({
      isGenerated: false,
      appFirstName: '',
      appLastName: '',
      appPosition: '',
      appPhone: '',
      appEmailAddress: ''
    });
  }
  handleCopyToClipboard = async e => {
    e.preventDefault();
    const {
      currentTarget: copyToClipboardButton
    } = e;
    const copyToClipboardButtonIcon = copyToClipboardButton.querySelector('.fa');
    const {
      classList: copyToClipboardButtonIconClassList
    } = copyToClipboardButtonIcon;
    const {
      body: documentBody
    } = document;
    const appEmailSignature = document.getElementById('appEmailSignature');
    let range;
    let windowSelection;
    if (document.createRange && window.getSelection) {
      range = document.createRange();
      windowSelection = window.getSelection();
      windowSelection.removeAllRanges();
      try {
        range.selectNodeContents(appEmailSignature);
        windowSelection.addRange(range);
      } catch (error) {
        range.selectNode(appEmailSignature);
        windowSelection.addRange(range);
      }
    } else if (documentBody.createTextRange) {
      range = documentBody.createTextRange();
      range.moveToElementText(appEmailSignature);
      range.select();
    }
    copyToClipboardButtonIconClassList.remove('fa-clipboard');
    copyToClipboardButtonIconClassList.add('fa-check');
    document.execCommand('copy');
  }
  render = () => {
    const defaultSupStyle = {
      color: 'red',
      fontWeight: 'bolder'
    };
    const {
      isLoading,
      isGenerating,
      isGenerated,
      appFirstName,
      appLastName,
      appPosition,
      appPhone,
      appEmailAddress
    } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            {
              isLoading
                ? <h3>Loading...</h3>
                : <Fragment>
                  <h3>Piki Tech :: Email Signature Generator</h3>
                  <div className="alert alert-primary" role="alert">
                    To generate a new email signature, simply fill in the form below then click <strong>Generate</strong>.
                    <hr />
                    <sup style={defaultSupStyle}>*</sup> denotes required fields
                  </div>
                  <form onSubmit={this.handleFormSubmit} noValidate>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="appFirstName">First Name <sup style={defaultSupStyle}>*</sup></label>
                          <input
                            id="appFirstName"
                            name="appFirstName"
                            type="text"
                            className="form-control"
                            placeholder="E.g. Tama"
                            required
                            value={appFirstName}
                            onChange={this.handleElementChange}
                            disabled={isGenerating}
                          />
                          <div className="invalid-feedback">
                            Please provide a vaild First Name. E.g. Tama
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="appLastName">Last Name <sup style={defaultSupStyle}>*</sup></label>
                          <input
                            id="appLastName"
                            name="appLastName"
                            type="text"
                            className="form-control"
                            placeholder="E.g. Nuitera"
                            required
                            value={appLastName}
                            onChange={this.handleElementChange}
                            disabled={isGenerating}
                          />
                          <div className="invalid-feedback">
                            Please provide a vaild Last Name. E.g. Nuitera
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="appPosition">Position <sup style={defaultSupStyle}>*</sup></label>
                          <input
                            id="appPosition"
                            name="appPosition"
                            type="text"
                            className="form-control"
                            placeholder="E.g. Co-founder/Solution Developer"
                            required
                            value={appPosition}
                            onChange={this.handleElementChange}
                            disabled={isGenerating}
                          />
                          <div className="invalid-feedback">
                            Please provide a vaild Position. E.g. Co-founder/Solution Developer
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="appPhone">Phone <sup style={defaultSupStyle}>*</sup></label>
                          <input
                            id="appPhone"
                            name="appPhone"
                            type="tel"
                            className="form-control"
                            placeholder="E.g. +642123456789"
                            required
                            value={appPhone}
                            onChange={this.handleElementChange}
                            disabled={isGenerating}
                          />
                          <div className="invalid-feedback">
                            Please provide a vaild Phone. E.g. +642123456789
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="col">
                        <div className="form-group">
                          <label htmlFor="appEmailAddress">Email Address <sup style={defaultSupStyle}>*</sup></label>
                          <input
                            id="appEmailAddress"
                            name="appEmailAddress"
                            type="email"
                            className="form-control"
                            placeholder="E.g. Tama.Nuitera@PikiTech.co.nz"
                            required
                            value={appEmailAddress}
                            onChange={this.handleElementChange}
                            disabled={isGenerating}
                          />
                          <div className="invalid-feedback">
                            Please provide a vaild Email Address. E.g. Tama.Nuitera@PikiTech.co.nz
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-row mb-3">
                      <div className="col">
                        <button className="btn btn-success" type="submit" disabled={isGenerating}>
                          Generate
                        </button>
                        <button className="btn btn-link" type="reset" onClick={this.handleResetClick} disabled={isGenerating}>
                          Reset
                        </button>
                      </div>
                    </div>
                  </form>
                  {
                    isGenerated
                      ? <Fragment>
                        <div className="alert alert-success" role="alert">
                          Email Signature generated.
                          <button
                            id="copyToClipboardButton"
                            className="btn btn-sm btn-outline-success float-right"
                            type="button"
                            onClick={this.handleCopyToClipboard}
                          >
                            Copy to Clipboard <i className="fa fa-clipboard"></i>
                          </button>
                        </div>
                        <EmailSignature
                          id="appEmailSignature"
                          firstName={appFirstName}
                          lastName={appLastName}
                          position={appPosition}
                          phone={appPhone}
                          emailAddress={appEmailAddress}
                        />
                      </Fragment>
                      : null
                  }
                </Fragment>
            }
          </div>
        </div>
      </div>
    );
  }
}
render(
  <App />,
  document.getElementById('root')
);