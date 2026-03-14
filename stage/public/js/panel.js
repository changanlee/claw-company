// DataPanel — toggleable right-side overlay showing agent stats and event log
class DataPanel {
  constructor(agentDefs) {
    this.agentDefs = agentDefs;
    this.events = [];
    this.maxEvents = 30;
    this.visible = false;

    this.panel = document.getElementById('data-panel');
    this.toggleBtn = document.getElementById('panel-toggle');
    this.toggleBtn.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.visible = !this.visible;
    this.panel.classList.toggle('open', this.visible);
    if (this.visible) this.render();
  }

  addEvent(event) {
    this.events.unshift(event);
    if (this.events.length > this.maxEvents) this.events.pop();
    if (this.visible) this.render();
  }

  updateAgents(agentsState) {
    this._agentsState = agentsState;
    if (this.visible) this.render();
  }

  render() {
    const agentsList = document.getElementById('panel-agents');
    const eventLog = document.getElementById('panel-events');

    // Agents
    if (this._agentsState) {
      agentsList.innerHTML = Object.entries(this._agentsState)
        .map(([id, agent]) => {
          const def = this.agentDefs[id] || {};
          const role = I18n.t(`role.${def.role || id}`);
          const displayName = def.name ? `${def.name}(${role})`.trim() : role;
          // Chairman uses chairman.* keys, agents use status.* keys
          const statusKey = def.role === 'chairman' ? `chairman.${agent.state}` : `status.${agent.state}`;
          let status = I18n.t(statusKey);
          if (status === statusKey) status = I18n.t(`status.${agent.state}`);
          if (status === `status.${agent.state}`) status = agent.state;
          const dotColor = agent.state === 'error' ? '#ef4444'
            : agent.state === 'offline' ? '#64748b'
            : agent.state === 'idle' ? '#22c55e' : '#3b82f6';
          return `<div class="panel-agent">
            <span class="dot" style="background:${dotColor}"></span>
            <span class="name">${displayName}</span>
            <span class="status">${status}</span>
          </div>`;
        }).join('');
    }

    // Events
    eventLog.innerHTML = this.events
      .map(e => {
        const time = new Date(e.timestamp).toLocaleTimeString();
        const desc = this._describeEvent(e);
        return `<div class="panel-event"><span class="time">${time}</span> ${desc}</div>`;
      }).join('');
  }

  _agentRole(agentId) {
    const def = this.agentDefs[agentId] || {};
    const roleKey = `role.${def.role || agentId}`;
    const role = I18n.t(roleKey);
    return role !== roleKey ? role : agentId;
  }

  _describeEvent(e) {
    switch (e.type) {
      case 'dispatch': return `${this._agentRole(e.from)} → ${this._agentRole(e.to)}: ${I18n.t('event.dispatch')}`;
      case 'report': return `${this._agentRole(e.from)} → ${this._agentRole(e.to || 'cc-ceo')}: ${I18n.t('event.report')}`;
      case 'approve': return `${this._agentRole('chairman')}: ${I18n.t('event.approve')}`;
      case 'reject': return `${this._agentRole('chairman')}: ${I18n.t('event.reject')}`;
      case 'alert': {
        const agent = this._agentRole(e.agent);
        return `${agent}: ${I18n.t('event.alert')}`;
      }
      case 'status_change': {
        const agent = this._agentRole(e.agent);
        const statusKey = `status.${e.state}`;
        let status = I18n.t(statusKey);
        if (status === statusKey) status = e.state;
        return `${agent}: ${status}`;
      }
      default: return e.type;
    }
  }
}
