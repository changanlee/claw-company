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
          const status = I18n.t(`status.${agent.state}`);
          const dotColor = agent.state === 'error' ? '#ef4444'
            : agent.state === 'offline' ? '#64748b'
            : agent.state === 'idle' ? '#22c55e' : '#3b82f6';
          return `<div class="panel-agent">
            <span class="dot" style="background:${dotColor}"></span>
            <span class="name">${role}</span>
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

  _describeEvent(e) {
    switch (e.type) {
      case 'dispatch': return `${e.from} → ${e.to}: dispatch`;
      case 'report': return `${e.from} → ${e.to}: report`;
      case 'approve': return `chairman: approved`;
      case 'reject': return `chairman: rejected`;
      case 'alert': return `${e.agent}: alert (${e.level})`;
      case 'status_change': return `${e.agent}: ${e.state}`;
      default: return e.type;
    }
  }
}
