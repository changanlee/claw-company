const { describe, it } = require('node:test');
const assert = require('node:assert');
const Simulator = require('../server/simulator');

describe('Simulator', () => {
  it('initializes with agents from config', () => {
    const agents = { 'cc-ceo': { id: 'cc-ceo', role: 'ceo' } };
    const sim = new Simulator(agents);
    const state = sim.getFullState();
    assert.ok(state.agents['cc-ceo']);
    assert.strictEqual(state.agents['cc-ceo'].state, 'idle');
  });

  it('initializes chairman state', () => {
    const sim = new Simulator({});
    const state = sim.getFullState();
    assert.ok(state.chairman);
    assert.strictEqual(state.chairman.state, 'idle');
  });

  it('generates a valid event', () => {
    const agents = {
      'cc-ceo': { id: 'cc-ceo', role: 'ceo' },
      'cc-cto': { id: 'cc-cto', role: 'cto' }
    };
    const sim = new Simulator(agents);
    const event = sim.generateEvent();
    assert.ok(event.type);
    assert.ok(event.timestamp);
    assert.ok(['dispatch', 'report', 'approve', 'reject', 'alert', 'status_change'].includes(event.type));
  });

  it('updates agent state on status_change event', () => {
    const agents = { 'cc-ceo': { id: 'cc-ceo', role: 'ceo' } };
    const sim = new Simulator(agents);
    sim.applyEvent({ type: 'status_change', agent: 'cc-ceo', state: 'working', timestamp: Date.now() });
    const state = sim.getFullState();
    assert.strictEqual(state.agents['cc-ceo'].state, 'working');
  });

  it('updates chairman state based on active tasks', () => {
    const agents = { 'cc-ceo': { id: 'cc-ceo', role: 'ceo' } };
    const sim = new Simulator(agents);
    sim.applyEvent({ type: 'dispatch', from: 'chairman', to: 'cc-ceo', timestamp: Date.now() });
    const state = sim.getFullState();
    assert.strictEqual(state.chairman.state, 'monitoring');
  });

  it('tracks pending approvals', () => {
    const agents = { 'cc-ceo': { id: 'cc-ceo', role: 'ceo' } };
    const sim = new Simulator(agents);
    sim.applyEvent({ type: 'report', from: 'cc-ceo', to: 'chairman', detail: 'Need approval', timestamp: Date.now() });
    const state = sim.getFullState();
    assert.ok(state.chairman.pendingApprovals > 0);
  });

  it('full_state includes event history', () => {
    const agents = { 'cc-ceo': { id: 'cc-ceo', role: 'ceo' } };
    const sim = new Simulator(agents);
    sim.applyEvent({ type: 'status_change', agent: 'cc-ceo', state: 'working', timestamp: Date.now() });
    const state = sim.getFullState();
    assert.ok(state.recentEvents.length > 0);
  });
});
