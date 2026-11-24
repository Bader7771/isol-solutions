import { test } from "node:test";
import assert from "node:assert/strict";
import { requestVisit } from "../src/features/contact/enquiry-api.js";

function form() {
  const fields = new FormData();
  for (const [name, value] of Object.entries({
    fullName: "Exemple",
    company: "Entreprise exemple",
    email: "test@example.invalid",
    phone: "+212600000000",
    projectType: "sante",
    city: "Fès",
    surface: "",
    deadline: "",
    description: "Une nouvelle salle technique.",
    consent: "on",
  }))
    fields.set(name, value);
  return fields;
}

test("qualified form sends a JSON part and an optional PDF, then returns the server receipt", async (t) => {
  const fields = form();
  fields.set(
    "plan",
    new File(["%PDF-1.4\n%%EOF"], "plan.pdf", { type: "application/pdf" }),
  );
  const fetch = t.mock.method(globalThis, "fetch", async (url, options) => {
    assert.equal(url, "/api/enquiries");
    assert.equal(options.method, "POST");
    const request = JSON.parse(await options.body.get("request").text());
    assert.equal(request.projectType, "sante");
    assert.equal(request.surface, null);
    assert.equal(request.deadline, null);
    assert.equal(request.consent, true);
    assert.equal(options.body.get("plan").name, "plan.pdf");
    return Response.json({ reference: "test-local" }, { status: 201 });
  });
  assert.equal(await requestVisit(fields), "test-local");
  assert.equal(fetch.mock.callCount(), 1);
});

test("server rejection remains actionable and never returns a receipt", async (t) => {
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({ message: "Joignez un document PDF." }, { status: 400 }),
  );
  await assert.rejects(() => requestVisit(form()), /Joignez un document PDF/);
});

test("an oversized plan is rejected before any upload", async (t) => {
  const fetch = t.mock.method(globalThis, "fetch", () => {
    throw Error("Unexpected request");
  });
  const fields = form();
  fields.set(
    "plan",
    new File([new Uint8Array(5 * 1024 * 1024 + 1)], "large.pdf", {
      type: "application/pdf",
    }),
  );
  await assert.rejects(() => requestVisit(fields), /dépasse 5 Mo/);
  assert.equal(fetch.mock.callCount(), 0);
});
