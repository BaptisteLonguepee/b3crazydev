import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import React from "react";

export class TestParticles extends React.PureComponent {
    async customInit(engine: Engine): Promise<void> {
        await loadFireworksPreset(engine);
    }

    render() {
        const options: any = {
            preset: "fireworks",
        };

        return <Particles options={options} init={this.customInit} />;
    }
}
