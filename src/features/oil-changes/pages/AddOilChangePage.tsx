import { AddOilChangeForm } from "../components/add-oil-change-form";

export function AddOilChangePage(){
  return <div className="space-y-4">
    <h1 className="text-xl font-semibold">Nouvelle vidange</h1>
    <AddOilChangeForm />
  </div>;
}
