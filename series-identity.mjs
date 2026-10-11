export function seriesIdentity(request) {
  const required = ['provider','symbol','kind','timeframe','session','currency','volume','revision'];
  const values = {};
  for (const field of required) {
    const value = request?.[field];
    if (typeof value !== 'string' || !value.trim() || value.trim() === 'unknown') return {ok:false, reason:'Missing or unknown '+field};
    values[field] = value.trim();
  }
  if (!['quotation','dated-future','continuous-future','fund'].includes(values.kind)) return {ok:false, reason:'Unsupported instrument kind'};
  if (values.kind === 'dated-future' && (typeof request.contract !== 'string' || !request.contract.trim() || request.contract.trim() === 'unknown')) return {ok:false, reason:'A dated contract needs a contract identity'};
  if (values.kind === 'continuous-future' && !['adjusted','unadjusted'].includes(request.policy)) return {ok:false, reason:'Continuous history needs a known adjustment policy'};
  const ordered = required.map(field=>[field, values[field]]);
  ordered.push(['contract',values.kind === 'dated-future' ? request.contract.trim() : null]);
  ordered.push(['policy',values.kind === 'continuous-future' ? request.policy : null]);
  return {ok:true,key:JSON.stringify(['series-identity-v1',ordered])};
}
