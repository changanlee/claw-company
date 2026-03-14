const AGENT_STATES = ['idle', 'working', 'researching', 'executing', 'dispatching', 'awaiting', 'error', 'offline'];
const EVENT_TYPES = ['dispatch', 'report', 'approve', 'reject', 'alert', 'status_change'];
const MAX_RECENT_EVENTS = 50;

class Simulator {
  constructor(agentDefs) {
    this.agentIds = Object.keys(agentDefs).filter(id => id !== 'chairman');
    this.agents = {};
    for (const id of this.agentIds) {
      this.agents[id] = { id, state: 'idle', lastActivity: Date.now() };
    }
    this.chairman = { state: 'idle', pendingApprovals: 0, activeTasks: 0 };
    this.recentEvents = [];
    this.timer = null;
  }

  getFullState() {
    return {
      agents: { ...this.agents },
      chairman: { ...this.chairman },
      recentEvents: [...this.recentEvents]
    };
  }

  generateEvent() {
    const type = EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)];
    const now = Date.now();
    let event;

    switch (type) {
      case 'status_change': {
        const agent = this._randomAgent();
        const state = AGENT_STATES[Math.floor(Math.random() * AGENT_STATES.length)];
        event = { type, agent, state, timestamp: now };
        break;
      }
      case 'dispatch': {
        const from = Math.random() > 0.5 ? 'chairman' : this._randomAgent();
        let to = this._randomAgent();
        if (this.agentIds.length >= 2) {
          while (to === from) to = this._randomAgent();
        }
        event = { type, from, to, detail: 'Simulated task', timestamp: now };
        break;
      }
      case 'report': {
        const from = this._randomAgent();
        const to = Math.random() > 0.5 ? 'chairman' : 'cc-ceo';
        event = { type, from, to, detail: 'Task completed', timestamp: now };
        break;
      }
      case 'approve':
      case 'reject': {
        event = { type, from: 'chairman', detail: 'Budget request', timestamp: now };
        break;
      }
      case 'alert': {
        const agent = this._randomAgent();
        event = { type, agent, level: Math.random() > 0.5 ? 'warning' : 'critical', timestamp: now };
        break;
      }
      default:
        event = { type: 'status_change', agent: this._randomAgent(), state: 'idle', timestamp: now };
    }

    this.applyEvent(event);
    return event;
  }

  applyEvent(event) {
    this.recentEvents.push(event);
    if (this.recentEvents.length > MAX_RECENT_EVENTS) {
      this.recentEvents.shift();
    }

    switch (event.type) {
      case 'status_change':
        if (this.agents[event.agent]) {
          this.agents[event.agent].state = event.state;
          this.agents[event.agent].lastActivity = event.timestamp;
        }
        break;
      case 'dispatch':
        if (event.from === 'chairman') {
          this.chairman.activeTasks++;
          this.chairman.state = 'monitoring';
        }
        if (this.agents[event.to]) {
          this.agents[event.to].state = 'working';
          this.agents[event.to].lastActivity = event.timestamp;
        }
        break;
      case 'report':
        if (event.to === 'chairman') {
          this.chairman.pendingApprovals++;
          this.chairman.state = 'reviewing';
        }
        if (this.agents[event.from]) {
          this.agents[event.from].lastActivity = event.timestamp;
        }
        break;
      case 'approve':
        this.chairman.pendingApprovals = Math.max(0, this.chairman.pendingApprovals - 1);
        this.chairman.activeTasks = Math.max(0, this.chairman.activeTasks - 1);
        this.chairman.state = this.chairman.pendingApprovals > 0 ? 'reviewing'
          : this.chairman.activeTasks > 0 ? 'monitoring' : 'idle';
        break;
      case 'reject':
        this.chairman.pendingApprovals = Math.max(0, this.chairman.pendingApprovals - 1);
        this.chairman.state = this.chairman.pendingApprovals > 0 ? 'reviewing'
          : this.chairman.activeTasks > 0 ? 'monitoring' : 'idle';
        break;
      case 'alert':
        if (this.agents[event.agent]) {
          this.agents[event.agent].state = 'error';
          this.agents[event.agent].lastActivity = event.timestamp;
        }
        break;
    }
  }

  start(callback, minInterval = 5000, maxInterval = 15000) {
    const tick = () => {
      const event = this.generateEvent();
      callback(event);
      const delay = minInterval + Math.random() * (maxInterval - minInterval);
      this.timer = setTimeout(tick, delay);
    };
    tick();
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  pause() { this.stop(); }
  resume(callback, minInterval, maxInterval) { this.start(callback, minInterval, maxInterval); }

  _randomAgent() {
    return this.agentIds[Math.floor(Math.random() * this.agentIds.length)];
  }
}

module.exports = Simulator;
