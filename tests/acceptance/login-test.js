import { module, test } from "qunit";
import { visit, fillIn, click, pauseTest } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";

module("Acceptance | Login", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("Log in with valid credentials", async function (assert) {
    let email = "teste@teste.com";
    let password = "teste@123";
    this.server.create("user", { email, password });

    await visit("/login");
    await fillIn("#email", email);
    await fillIn("#password", password);
    await click("[data-test-rr=login-button]");

    assert
      .dom("[data-test-rr=bands-empty-message]")
      .hasText(
        "Let's start by creating a band.",
        "A descriptive empty message is shown"
      );
    assert
      .dom("[data-test-rr=user-email]")
      .hasText(email, "The logged in user's email is shown");

    await pauseTest();
    await click("[data-test-rr=logout]");
    assert.dom("[data-test-rr=form-header]").hasText("Log in to R&R");
    assert.dom("[data-test-rr=user-email]").doesNotExist();
  });
});
