import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  editMode: boolean = false;
  toEdit: number = 0;
  toDelete: number = 0;

  personForm!: FormGroup;

  formTemplate: any = {
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    student: false
  }

  people: Person[] = [
    { id: 1, firstname: "Alexander", lastname: "van Dalen", student: false },
    { id: 2, firstname: "Guillaume", lastname: "Varoquaux", student: false },
    { id: 3, firstname: "Jean", lastname: "Dupont", student: true },
  ]

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.personForm = this.formBuilder.group(this.formTemplate);
  }

  onCreatePerson() {
    let person: Person = this.personForm.value;
    if (this.editMode) {
      // update
      this.people.splice(this.toEdit, 1, person);
    } else  {
      // create
      this.people.push(person);
    }
    this.abortEdit();
  }

  onEditPerson(person: Person, id: number) {
    this.editMode = true;
    this.toEdit = id;

    this.personForm.get("id")?.setValue(person.id);
    this.personForm.get("lastname")?.setValue(person.lastname);
    this.personForm.get("firstname")?.setValue(person.firstname);
    this.personForm.get("student")?.setValue(person.student);
  }

  onRemovePerson(id: number) {
      this.toDelete = id;
  }

  onConfirmRemove() {
    this.people.splice(this.toDelete, 1);
    this.toDelete = 0;
  }

  abortEdit() {
    this.personForm.reset();
    this.editMode = false;
    this.toEdit = 0;
  }
}
