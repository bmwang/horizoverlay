import React, { Component } from 'react'
import './config.css'
// import 'semantic-ui-css/semantic.min.css';

class Config extends Component {
  state = {
    config: {},
    isConfigOpen: false
  }
  defaultConfig = {
    color: 'byRole',
    encounterDuration: false,
    encounterTotalDps: false,
    showHps: true,
    jobIcon: true,
    showRank: true,
    showDamagePercent: true
  }
  componentDidMount() {
    window.addEventListener('storage', this.onStorageUpdate, false)
    const configStore = localStorage.getItem('horizoverlay')
    if (!configStore) {
      const config = this.defaultConfig
      localStorage.setItem('horizoverlay', JSON.stringify(config))
      this.setState({ config })
    } else {
      const config = JSON.parse(configStore)
      this.setState({ config })
    }
  }
  onStorageUpdate() {
    // reload the overlay
    // console.log('alo?')
    window.opener.location.reload()
  }
  handleConfig = e => {
    const target = e.target
    const config = { ...this.state.config }
    let key = target.name,
      value = target.value

    // Why aren't HTML elements more consistent? 😦
    if (target.type === 'checkbox') {
      value = target.checked
    }

    // update the value in our copied state...
    config[key] = value
    // ...and set it to component' state
    this.setState({ config })

    // And then save it to localStorage!
    localStorage.setItem('horizoverlay', JSON.stringify(config))
  }
  // *** IMPORTANT ***
  // Gotta bind 'onClick' for checkboxes since false values don't bubble to 'onChange'!
  render() {
    const { config } = this.state
    return (
      <div className="config">
        <div>
          Resize this window as necessary. Everything saves automatically.{' '}
          <strong>Right click</strong> open this window.
        </div>
        <form>
          <fieldset>
            <legend>Color theme</legend>
            <div>
              <input
                type="radio"
                name="color"
                value="default"
                checked={config.color === 'default'}
                onChange={this.handleConfig}
              />
              <label htmlFor="colorDefault">Black & White (default)</label>
              <input
                type="radio"
                name="color"
                value="byRole"
                checked={config.color === 'byRole'}
                onChange={this.handleConfig}
              />
              <label htmlFor="colorByRole">Color By Role</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Check to Show</legend>
            <input
              type="checkbox"
              name="encounterDuration"
              id="encounterDuration"
              defaultChecked={config.encounterDuration}
              onClick={this.handleConfig}
            />
            <label htmlFor="encounterDuration">Encounter Duration</label>
            <input
              type="checkbox"
              name="encounterTotalDps"
              id="encounterTotalDps"
              defaultChecked={config.encounterTotalDps}
              onClick={this.handleConfig}
            />
            <label htmlFor="encounterTotalDps">Encounter Total DPS</label>
            <input
              type="checkbox"
              name="showHps"
              id="showHps"
              defaultChecked={config.showHps}
              onClick={this.handleConfig}
            />
            <label htmlFor="showHps">Show HPS</label>
            <input
              type="checkbox"
              name="showJobIcon"
              id="showJobIcon"
              defaultChecked={config.showJobIcon}
              onClick={this.handleConfig}
            />
            <label htmlFor="showJobIcon">Show Job Icon</label>
            <input
              type="checkbox"
              name="showRank"
              id="showRank"
              defaultChecked={config.showRank}
              onClick={this.handleConfig}
            />
            <label htmlFor="showRank">Show Rank</label>
            <input
              type="checkbox"
              name="showDamagePercent"
              id="showDamagePercent"
              defaultChecked={config.showDamagePercent}
              onClick={this.handleConfig}
            />
            <label htmlFor="showDamagePercent">Show Damage Percent</label>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default Config
