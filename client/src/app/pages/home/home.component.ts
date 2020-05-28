import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  constructor() {}

  ngOnInit() {
    this.myStyle = {
      position: "fixed",
      width: "100%",
      height: "100%",
      "z-index": -1,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 300,
        },
        color: {
          value: "#fff",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.8,
        },
        size: {
          value: 5,
        },
        line_linked: {
          enable: false,
        },
        move: {
          direction: "bottom",
          speed: 1,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "remove",
          },
          onclick: {
            enable: false,
            mode: "remove",
          },
          resize: false,
        },
      },
    };
  }
}
