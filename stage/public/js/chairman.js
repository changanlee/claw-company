// ChairmanController — state machine and idle behavior timer
class ChairmanController {
  constructor(scene, agentManager, idleBehaviors) {
    this.scene = scene;
    this.agentManager = agentManager;
    this.behaviors = (idleBehaviors && idleBehaviors.chairman) || [];
    this.currentState = 'idle';
    this.idleTimer = null;
    this._startIdleCycle();
  }

  updateState(newState, data) {
    this.currentState = newState;

    if (newState === 'idle') {
      this._startIdleCycle();
    } else {
      this._stopIdleCycle();
    }

    this.agentManager.updateState('chairman', newState);

    // State-specific bubble text
    const bubbleKey = `chairman.${newState}`;
    this.agentManager.showBubble('chairman', I18n.t(bubbleKey));
  }

  _startIdleCycle() {
    this._stopIdleCycle();
    const next = () => {
      const behavior = this._pickBehavior();
      if (behavior) {
        const idleKey = `idle.${behavior.action}`;
        const idleText = I18n.t(idleKey);
        this.agentManager.showBubble('chairman', idleText !== idleKey ? idleText : behavior.action.replace(/-/g, ' '));
        this.idleTimer = this.scene.time.delayedCall(behavior.duration, next);
      }
    };
    this.idleTimer = this.scene.time.delayedCall(3000, next);
  }

  _stopIdleCycle() {
    if (this.idleTimer) {
      this.idleTimer.remove(false);
      this.idleTimer = null;
    }
  }

  _pickBehavior() {
    const hour = new Date().getHours();
    const eligible = this.behaviors.filter(b => {
      if (b.condition === 'after-22:00' && hour < 22) return false;
      return true;
    });
    if (eligible.length === 0) return null;

    const totalWeight = eligible.reduce((sum, b) => sum + b.weight, 0);
    let roll = Math.random() * totalWeight;
    for (const b of eligible) {
      roll -= b.weight;
      if (roll <= 0) return b;
    }
    return eligible[eligible.length - 1];
  }
}
