<svelte:head>
  <title>Privacy Policy</title>
  <meta name="description" content="Privacy Policy for The Dles" />
</svelte:head>

<div>
  <h1>Privacy Policy</h1>
  <p class="updated">
    Last updated: <time datetime="2026-11-25">November 25, 2026</time>
  </p>

  <section>
    <p>
      This policy explains what data The Dles collects and how it is used. We do
      not require accounts and do not ask for personal information.
    </p>
  </section>

  <section>
    <h2>Data Stored on Your Device</h2>
    <p>
      Your favorites and settings are saved in your browser's local storage.
      This data never leaves your device and is deleted when you clear your
      browser data.
    </p>
  </section>

  <section>
    <h2>Analytics</h2>
    <p>We use two analytics tools:</p>
    <ul>
      <li>
        <strong>Umami</strong> (self-hosted): collects anonymous page views, referrers,
        browser, device, and country. It uses no cookies.
      </li>
      <li>
        <strong>Google Analytics</strong>: collects similar usage data and uses
        cookies. See
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer">Google's Privacy Policy</a
        >. You can opt out with the
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer">Google Analytics Opt-out Add-on</a
        >.
      </li>
    </ul>
  </section>

  <section id="privacy-choices">
    <h2>California Consumer Privacy Act (“CCPA”)</h2>
    <p>
      Under CCPA, Californian residents have the right to declare their
      preferences on the sale of data for advertising and marketing purposes. If
      you wish to change your preferences, click this link to launch our
      preference portal:
    </p>
    <div data-fuse-privacy-tool></div>
    <p>
      We use a third-party to provide monetisation technologies for our site.
      You can review their privacy and cookie policy at
      <a
        href="https://publift.com/privacy-policy/"
        target="_blank"
        rel="noopener noreferrer">https://publift.com/privacy-policy/</a
      >.
    </p>
  </section>

  <section>
    <h2>Third-Party Sites and Services</h2>
    <p>
      As a daily web game directory, we link you to other sites that have their
      own privacy policies.
    </p>

    <p>
      We use Tally for our forms, for things such as suggesting dles or
      reporting bugs. You can read <a
        href="https://tally.so/help/privacy-policy"
        target="_blank"
        rel="noopener noreferrer">their privacy policy</a
      >.
    </p>

    <p>
      Our community is on Discord. Information you submit there is handled under
      their policies.
    </p>
  </section>

  <section>
    <h2>Your Rights</h2>
    <p>
      Depending on where you live (e.g. under GDPR or CCPA), you may have the
      right to access, delete, or object to the processing of your data. Since
      we don't store personal data ourselves, most requests are best directed to
      the third parties above. You can also contact us below.
    </p>
  </section>

  <section>
    <h2>Children's Privacy</h2>
    <p>
      The Dles is not directed at children under 13, and we do not knowingly
      collect their personal information.
    </p>
  </section>

  <section>
    <h2>Contact</h2>
    <p>
      If you have questions or concerns, you can either send an email to <a
        href="mailto:mail@aukspot.com">mail@aukspot.com</a
      > or message @aukspot on Discord.
    </p>
  </section>
</div>

<style>
  h1 {
    text-align: center;
    font-size: 1.8rem;
    font-weight: 700;
    margin-top: 1rem;
  }

  .updated {
    text-align: center;
    font-size: 0.875rem;
    opacity: 0.7;
    margin-top: 0;
  }

  section {
    max-width: 45rem;
    margin: 1rem auto;
    padding-inline: 1rem;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    margin-block: 0.5rem;
  }

  ul {
    list-style: disc;
    padding-left: 1.5rem;
  }

  li {
    margin-block: 0.25rem;
  }

  a {
    text-decoration: underline;
  }

  :global(#fuse-privacy-tool) {
    font-size: 0.5rem;
  }
</style>
