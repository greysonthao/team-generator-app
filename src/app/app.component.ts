import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  member = '';
  allMembers: string[] = [];
  numOfTeams: number | '' = '';
  errorMessage = '';
  teams: string[][] = [];

  onInput(inputValue: string) {
    this.member = inputValue;
  }

  addMember() {
    if (this.member.length === 0) {
      this.errorMessage = 'Error: Name cannot be empty';
      return;
    }

    this.errorMessage = '';

    this.allMembers.push(this.member);
    this.member = '';
  }

  numberOfTeamsInput(inputVal: string) {
    this.numOfTeams = parseInt(inputVal);
  }

  deleteName(member: string) {
    const members = [...this.allMembers];
    const membersLeft = members.filter((name) => name != member);
    this.allMembers = membersLeft;
  }

  generateTeams() {
    if (this.numOfTeams <= 0) {
      this.errorMessage = 'Error: Number cannot be less than or equal to 0';
      this.numOfTeams = '';
      return;
    }

    if (this.numOfTeams > this.allMembers.length) {
      this.errorMessage =
        'Error: Number cannot be greater than the list of names';
      this.numOfTeams = '';
      return;
    }

    this.errorMessage = '';
    const members = [...this.allMembers];

    while (members.length > 0) {
      for (let i = 0; i < this.numOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * members.length);
        const member = members.splice(randomIndex, 1)[0];
        if (!member) break;
        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    this.numOfTeams = '';
    this.allMembers = [];
  }

  deleteTeams() {
    this.teams = [];
  }
}
