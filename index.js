const Actor = require("@dfinity/agent").Actor;
const HttpAgent = require("@dfinity/agent").HttpAgent;
const canisterId = "ryjl3-tyaaa-aaaaa-aaaba-cai";
global.fetch = require("node-fetch");
const agent = new HttpAgent({
  host: "http://localhost:8000",
});
const idlFactory = ({ IDL }) => {
  return IDL.Service({
      'getCustodians': IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
      'getCrossChainCanister': IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
  });
};

// agent.fetchRootKey();
const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

(async () => {
  res = await actor.getCustodians().catch(e => { return "Error" + e });
  console.log(res.toString());
  res = await actor.getCrossChainCanister().catch(e => { return "Error" + e });
  console.log(res.toString());
})();