import { Injectable } from '@nestjs/common';

@Injectable()
export class CommunityScriptService {
  constructor() {}

  getScripts() {
    // Look into scripts folder to generate array of scripts
  }

  async runScript(scriptName: string, scriptParams: any) {
    const scripts = await this.getScripts();

    const script = scripts.find((item) => item.name === scriptName);

    if (!script) {
      return;
    }

    await this[script.scriptName](scriptParams);
  }
}
