import logging

formatter = logging.Formatter(fmt='%(asctime)-15s %(levelname)-8s %(message)s')
handler = logging.FileHandler('log.log', 'a+')
handler.setFormatter(formatter)

logger = logging.getLogger('blockterm')
logger.setLevel(logging.INFO)
logger.addHandler(handler)
