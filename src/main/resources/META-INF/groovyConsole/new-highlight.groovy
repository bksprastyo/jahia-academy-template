import org.jahia.api.Constants
import org.jahia.services.content.*
import org.jahia.services.sites.JahiaSite

import javax.jcr.NodeIterator
import javax.jcr.RepositoryException
import javax.jcr.query.Query

def logger = log;

boolean doIt = false;


def JahiaSite site = org.jahia.services.sites.JahiaSitesService.getInstance().getSiteByKey("academy");
Set<String> nodesToAutoPublish = new HashSet<String>();

for (Locale locale : site.getLanguagesAsLocales()) {
    JCRTemplate.getInstance().doExecuteWithSystemSession(null, Constants.EDIT_WORKSPACE, locale, new JCRCallback() {
        @Override
        Object doInJCR(JCRSessionWrapper session) throws RepositoryException {
            def q = "select * from [jacademix:textContent] where isdescendantnode('/sites/academy')";

            logger.info("Processing " + q)
            NodeIterator iterator = session.getWorkspace().getQueryManager().createQuery(q, Query.JCR_SQL2).execute().getNodes();
            while (iterator.hasNext()) {
                final JCRNodeWrapper node = (JCRNodeWrapper) iterator.nextNode();
                String textContent = node.getPropertyAsString('textContent');
                if (textContent != null) {
                    //String textContent2 = textContent.replaceAll("<code class=\"language-", "<code class=\"");
                    String textContent2 = textContent.replaceAll(" dir=\"ltr\"", "");
                    if (!textContent.equals(textContent2)) {
                        log.info(node.path);
                        node.setProperty('textContent', textContent2);
                        nodesToAutoPublish.add(node.getIdentifier());
                    }
                }
            }

            if (doIt) {
                session.save();
            }

            if (CollectionUtils.isNotEmpty(nodesToAutoPublish)) {
                if (doIt) {
                    JCRPublicationService.getInstance().publish(nodesToAutoPublish.asList(), Constants.EDIT_WORKSPACE, Constants.LIVE_WORKSPACE, false, null)
                }
                logger.info("");
                logger.info("Nodes which where republished:")
                for (String identifier : nodesToAutoPublish) {
                    logger.warn("   " + session.getNodeByIdentifier(identifier).getPath());
                }
            }
            return null;
        }
    });
}
