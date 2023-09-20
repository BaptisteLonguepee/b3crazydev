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
            particles: {
                number: {
                    value: 1,
                    max: 200,
                },
                life: {
                    duration: 10,
                    count: 1
                },
                move: {
                    out_mode: "out",
                },
            }
        };

        return <Particles options={options} init={this.customInit} />;
    }
}
